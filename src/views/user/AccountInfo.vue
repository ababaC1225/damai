<template>
  <UserCenterLayout>
    <div class="content-card">
          <h2 class="content-title">个人信息</h2>
          <p class="content-desc">完善您的个人信息，有助于提升账户安全与购票体验</p>

          <div class="form-item form-item-avatar">
              <label class="form-label">头像</label>
              <div class="avatar-wrap">
                <label>
                  <img
                      :src="form.avatar || defaultAvatar"
                      alt="头像"
                      class="avatar-img"
                    />
                  <input
                      type="file"
                      style="display: none"
                      @change="handleAvatarChange"
                    />
                </label>
                <div class="avatar-tip">
                  点击头像上传，支持 jpg、png，大小不超过 2MB
                </div>
              </div>
          </div>


            <div class="form-item">
              <label class="form-label"><span class="required">*</span> 昵称</label>
              <input
                v-model="form.nickname"
                type="text"
                class="form-input"
                placeholder="请输入昵称"
                maxlength="20"
              />
            </div>

            <div class="form-item">
              <label class="form-label">真实姓名</label>
              <input
                v-model="form.realName"
                type="text"
                class="form-input"
                placeholder="请输入真实姓名"
              />
            </div>

            <div class="form-item">
              <label class="form-label">性别</label>
              <div class="form-radio-group">
                <label class="form-radio">
                  <input v-model="form.gender" type="radio" value="male" />
                  <span>男</span>
                </label>
                <label class="form-radio">
                  <input v-model="form.gender" type="radio" value="female" />
                  <span>女</span>
                </label>
                <label class="form-radio">
                  <input v-model="form.gender" type="radio" value="" />
                  <span>保密</span>
                </label>
              </div>
            </div>

            <div class="form-item">
              <label class="form-label">出生日期</label>
              <input
                v-model="form.birthday"
                type="text"
                class="form-input"
                placeholder="如：1990-01-01"
              />
            </div>

            <div class="form-item">
              <label class="form-label">身份证号</label>
              <input
                v-model="form.idCard"
                type="text"
                class="form-input"
                placeholder="请输入身份证号"
                maxlength="18"
              />
            </div>

            <div class="form-actions">
              <button type="button" class="btn-save" @click="handleSave">保存</button>
            </div>
         
    </div>
  </UserCenterLayout>
</template>

<script setup>
import UserCenterLayout from './UserCenterLayout.vue'
import { reactive, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import request from '@/untils/request'

const userStore = useUserStore()

const defaultAvatar =
  '//img.alicdn.com/tfs/TB14UKCGQyWBuNjy0FpXXassXXa-54-54.png'

const form = reactive({
  nickname: '',
  avatar: '',
  realName: '',
  gender: '',
  birthday: '',
  idCard: ''
})

/* ================= 初始化加载 ================= */
onMounted(async () => {
  // 先用本地 store 的数据快速填充（避免闪烁）
  const info = userStore.userInfo || {}
  form.nickname = info.nickname || ''
  form.avatar = formatAvatarUrl(info.avatar) || ''
  form.realName = info.realName || ''
  form.idCard = info.idCard || ''
  if (info.gender === 'FEMALE') form.gender = 'female'
  else if (info.gender === 'MALE') form.gender = 'male'
  else form.gender = ''
  if (info.birthday) form.birthday = info.birthday.split('T')[0]

  // 然后向后端请求最新信息并覆盖（若登录且接口可用）
  try {
    const res = await request.get('/api/user')
    if (res && res.code === 200 && res.data) {
      const srv = res.data
      // 对头像 URL 进行格式化（相对路径转完整 URL）
      srv.avatar = formatAvatarUrl(srv.avatar)
      
      userStore.userInfo = srv
      userStore.persist()

      form.nickname = srv.nickname || ''
      form.avatar = srv.avatar || ''
      form.realName = srv.realName || ''
      form.idCard = srv.idCard || ''
      if (srv.gender === 'FEMALE') form.gender = 'female'
      else if (srv.gender === 'MALE') form.gender = 'male'
      else form.gender = ''
      if (srv.birthday) form.birthday = srv.birthday.split('T')[0]
    }
  } catch (err) {
    // 不阻塞界面，控制台打印便于排查
    console.error('加载用户信息失败', err)
  }
})

// 辅助函数：将相对路径转换为完整 URL
const formatAvatarUrl = (url) => {
  if (!url) return ''
  if (typeof url !== 'string') return ''
  // 如果已经是完整 URL，直接返回
  if (url.startsWith('http')) return url
  // 如果是相对路径，拼接成完整 URL
  const baseURL = 'http://193.112.68.157:8080'
  return baseURL + url
}

/* ================= 保存资料 ================= */
const handleSave = async () => {
  if (!form.nickname.trim()) {
    alert('请输入昵称')
    return
  }

  try {
    const payload = {
      nickname: form.nickname.trim(),
      realName: form.realName || null,
      gender: form.gender ? form.gender.toUpperCase() : null,
      birthday: form.birthday
        ? new Date(form.birthday).toISOString()
        : null,
      idCard: form.idCard || null
    }
    console.log('📤 发送保存请求: /api/user/update', payload)
    const res = await request.put('/api/user/update', payload)

    console.log('📥 保存响应:', res)
    if (res.code === 200) {
      alert('修改成功')

      // 无论后端返回什么，都用前端的 form 数据更新 store（避免数据丢失）
      userStore.userInfo = {
        ...userStore.userInfo,
        ...(res.data || payload),
        nickname: form.nickname,
        realName: form.realName,
        gender: form.gender ? form.gender.toUpperCase() : null,
        birthday: form.birthday ? new Date(form.birthday).toISOString() : null,
        idCard: form.idCard
      }
      userStore.persist()
      console.log('✅ 保存成功，userInfo 已更新:', userStore.userInfo)
    } else if (res.code === 401 || res.code === 403) {
      alert('会话已过期，请重新登录')
      userStore.logout()
      location.href = '/login'
    } else {
      alert(res.message || '修改失败')
    }
  } catch (error) {
    console.error('❌ 保存失败:', error)
    if (error.response?.status === 401 || error.response?.status === 403) {
      alert('会话已过期，请重新登录')
      userStore.logout()
      location.href = '/login'
      return
    }
    alert('修改失败：' + (error?.message || '未知错误'))
  }
}


/* ================= 上传头像 ================= */
const handleAvatarChange = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    alert('仅支持 jpg / png 格式')
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    alert('图片不能超过 2MB')
    return
  }

  const formData = new FormData()
  formData.append('avatar', file)

  try {
    console.log('📤 上传头像请求: /api/user/avatar, 文件:', file.name)
    const res = await request.post(
      '/api/user/avatar',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )

    console.log('📥 头像上传响应:', res)
    if (res.code === 200) {
      // 兼容返回的头像 URL（可能在 res.data.avatar 或 res.data）
      let avatarUrl = res.data?.avatar || res.data
      
      // 调用辅助函数处理相对路径
      avatarUrl = formatAvatarUrl(avatarUrl)
      
      if (avatarUrl) {
        form.avatar = avatarUrl
        userStore.userInfo.avatar = avatarUrl
        userStore.persist()
        console.log('✅ 头像上传成功，完整 URL:', avatarUrl)
        alert('头像上传成功')
      } else {
        console.warn('⚠️ 响应中没有头像 URL')
        alert('头像上传成功，但响应格式异常')
      }
    } else if (res.code === 401 || res.code === 403) {
      alert('会话已过期，请重新登录')
      userStore.logout()
      location.href = '/login'
    } else {
      alert(res.message || '上传失败')
    }
  } catch (err) {
    console.error('❌ 头像上传失败:', err)
    if (err.response?.status === 401 || err.response?.status === 403) {
      alert('会话已过期，请重新登录')
      userStore.logout()
      location.href = '/login'
      return
    }
    alert('上传失败: ' + (err?.message || '未知错误'))
  }
}
</script>


<style scoped>
.content-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 32px 40px;
}

.content-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  color: #111;
}

.content-desc {
  margin: 0 0 28px;
  font-size: 13px;
  color: #999;
}

.form-section {
  max-width: 560px;
}

.form-item {
  margin-bottom: 24px;
}

.form-item-avatar {
  margin-bottom: 28px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
}

.form-label .required {
  color: #ff1268;
  margin-right: 2px;
}

.form-input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #ff1268;
}

.form-input::placeholder {
  color: #bbb;
}

.avatar-wrap {
  display: flex;
  align-items: center;
  gap: 24px;
}

.avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #eee;
}

.avatar-tip {
  font-size: 12px;
  color: #999;
}

.form-radio-group {
  display: flex;
  gap: 24px;
  align-items: center;
}

.form-radio {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.form-radio input {
  width: 16px;
  height: 16px;
  accent-color: #ff1268;
}

.form-actions {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #eee;
}

.btn-save {
  padding: 10px 32px;
  font-size: 14px;
  color: #fff;
  background: linear-gradient(135deg, #ff1268, #ff4d8a);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-save:hover {
  opacity: 0.9;
}
</style>
