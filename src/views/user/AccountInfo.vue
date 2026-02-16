<template>
  <UserCenterLayout>
    <div class="content-card">
          <h2 class="content-title">个人信息</h2>
          <p class="content-desc">完善您的个人信息，有助于提升账户安全与购票体验</p>

          <div class="form-section">
            <div class="form-item form-item-avatar">
              <label class="form-label">头像</label>
              <div class="avatar-wrap">
                <img :src="form.avatar || defaultAvatar" alt="头像" class="avatar-img" />
                <div class="avatar-tip">支持 jpg、png，大小不超过 2MB</div>
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
    </div>
  </UserCenterLayout>
</template>

<script setup>
import UserCenterLayout from './UserCenterLayout.vue'
import { reactive, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const defaultAvatar = '//img.alicdn.com/tfs/TB14UKCGQyWBuNjy0FpXXassXXa-54-54.png'

const form = reactive({
  nickname: '',
  avatar: '',
  realName: '',
  gender: '',
  birthday: '',
  idCard: ''
})

onMounted(() => {
  form.nickname = userStore.userInfo.nickname || ''
  form.avatar = userStore.userInfo.avatar || ''
})

const handleSave = () => {
  if (!form.nickname.trim()) {
    alert('请输入昵称')
    return
  }
  userStore.userInfo.nickname = form.nickname.trim()
  if (form.avatar) userStore.userInfo.avatar = form.avatar
  userStore.persist()
  alert('保存成功')
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
