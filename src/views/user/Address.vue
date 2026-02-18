<template>
  <UserCenterLayout>
    <div class="content-card">
      <h2 class="content-title">收货地址</h2>
      <p class="content-desc">管理您的收货地址，购票后可快速选择配送地址</p>

      <!-- 空状态 -->
      <div class="empty-wrap" v-if="addresses.length === 0">
        <p class="empty-tip">添加收货地址，购票后更方便收货</p>
        <button type="button" class="btn-primary" @click="openAdd">新增收货地址</button>
      </div>

      <!-- 地址列表 -->
      <div class="list-wrap" v-else>
        <div class="addr-item" v-for="(a, idx) in addresses" :key="a.id">
          <div class="addr-main">
            <div class="addr-name">{{ a.recipientName }} <span class="addr-phone">{{ a.recipientPhone }}</span></div>
            <div class="addr-detail">{{ a.province }} {{ a.city }} {{ a.district }} {{ a.detailAddress }}</div>
          </div>
          <div class="addr-actions">
            <button class="btn-text" @click="edit(idx)">编辑</button>
            <button class="btn-text" @click="remove(a.id)">删除</button>
          </div>
        </div>

        <div class="add-more">
          <button type="button" class="btn-add-more" @click="openAdd">
            <span class="plus">+</span> 新增收货地址
          </button>
        </div>
      </div>

      <!-- 弹窗 -->
      <div class="modal" v-if="showAdd">
        <div class="modal-inner">
          <h3>{{ editingIndex === -1 ? '新增收货地址' : '编辑收货地址' }}</h3>
          <div class="form-item">
            <label>收件人</label>
            <input v-model="form.recipientName" />
          </div>
          <div class="form-item">
            <label>手机号</label>
            <input v-model="form.recipientPhone" />
          </div>
          <div class="form-item">
            <label>省份</label>
            <input v-model="form.province" />
          </div>
          <div class="form-item">
            <label>城市</label>
            <input v-model="form.city" />
          </div>
          <div class="form-item">
            <label>区/县</label>
            <input v-model="form.district" />
          </div>
          <div class="form-item">
            <label>详细地址</label>
            <input v-model="form.detailAddress" />
          </div>

          <div class="modal-actions">
            <button class="btn" @click="save">保存</button>
            <button class="btn btn-ghost" @click="cancel">取消</button>
          </div>
        </div>
      </div>
    </div>
  </UserCenterLayout>
</template>

<script setup>
import UserCenterLayout from './UserCenterLayout.vue'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import request from '@/untils/request'

const router = useRouter()
const userStore = useUserStore()

const addresses = ref([])
const showAdd = ref(false)
const editingIndex = ref(-1)
const form = reactive({
  id: null,
  recipientName: '',
  recipientPhone: '',
  province: '',
  city: '',
  district: '',
  detailAddress: ''
})

// 检查登录
const checkLogin = () => {
  console.log('🔍 检查登录状态：', {
    isLogin: userStore.isLogin,
    userInfo: userStore.userInfo,
    localStorage_token: localStorage.getItem('token'),
    localStorage_damai_user: localStorage.getItem('damai_user')
  })
  
  if (!userStore.isLogin) {
    // 如果状态为 false，尝试从 localStorage 恢复
    const stored = localStorage.getItem('damai_user')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed.isLogin && parsed.userInfo) {
          console.log('📦 从 localStorage 恢复登录状态')
          userStore.isLogin = parsed.isLogin
          userStore.userInfo = parsed.userInfo
          return true
        }
      } catch (e) {
        console.error('恢复状态失败', e)
      }
    }
    alert('请先登录')
    router.push('/login')
    return false
  }
  return true
}

// 向后端校验会话（Server-side session / Sa-Token）
const verifySession = async () => {
  try {
    const res = await request.get('/api/auth/check')
    if (res && res.code === 200) {
      // 同步用户信息到前端状态（若后端返回）
      if (res.data?.user) {
        userStore.isLogin = true
        userStore.userInfo = res.data.user
        userStore.persist()
      }
      return true
    }
  } catch (e) {
    console.warn('verifySession 失败', e)
  }
  return false
}

// 确保已登录：先本地检查，再向后端验证
const ensureSession = async () => {
  if (checkLogin()) return true
  const ok = await verifySession()
  if (!ok) {
    alert('请先登录')
    router.push('/login')
    return false
  }
  return true
}

// 获取地址列表
const fetchAddressList = async () => {
  if (!await ensureSession()) return
  try {
    // 不需要 headers Authorization，后端用 Session + Cookie
    const res = await request.get('/api/address')
    if (res.code === 200 && Array.isArray(res.data)) {
      addresses.value = res.data
    } else if (res.code === 401 || res.code === 403) {
      alert('会话已过期，请重新登录')
      userStore.logout()
      router.push('/login')
    }
  } catch (err) {
    console.error('获取地址失败', err)
  }
}

// 打开新增弹窗
const openAdd = async () => {
  if (!await ensureSession()) return
  editingIndex.value = -1
  Object.assign(form, {
    id: null,
    recipientName: '',
    recipientPhone: '',
    province: '',
    city: '',
    district: '',
    detailAddress: ''
  })
  showAdd.value = true
}

// 编辑地址
const edit = async (idx) => {
  if (!await ensureSession()) return
  editingIndex.value = idx
  Object.assign(form, addresses.value[idx])
  showAdd.value = true
}

// 删除地址
const remove = async (id) => {
  if (!await ensureSession()) return
  if (!confirm('确定删除该地址吗？')) return
  try {
    const res = await request.delete(`/api/address/delete/${id}`)
    if (res.code === 200) {
      addresses.value = addresses.value.filter(a => a.id !== id)
      alert('删除成功')
    } else {
      alert(res.message || '删除失败')
    }
  } catch (err) {
    console.error(err)
    alert('删除失败')
  }
}

// 保存地址（新增或编辑）
const save = async () => {
  if (!await ensureSession()) return
  try {
    const payload = { userId: userStore.userInfo?.id || 0, ...form }
    let res
    if (editingIndex.value === -1) {
      // 新增
      res = await request.post('/api/address', payload)
      if (res.code === 200) {
        alert('添加成功')
        fetchAddressList()
        showAdd.value = false
      } else {
        if (res.code === 401 || res.code === 403) {
          alert('会话已过期，请重新登录')
          userStore.logout()
          router.push('/login')
          return
        }
        alert(res.message || '添加失败')
      }
    } else {
      // 编辑
      res = await request.put('/api/address/update', payload)
      if (res.code === 200) {
        alert('修改成功')
        fetchAddressList()
        showAdd.value = false
      } else {
        if (res.code === 401 || res.code === 403) {
          alert('会话已过期，请重新登录')
          userStore.logout()
          router.push('/login')
          return
        }
        alert(res.message || '修改失败')
      }
    }
  } catch (err) {
    console.error('保存地址错误:', err)
    if (err.response?.status === 401 || err.response?.status === 403) {
      alert('会话已过期，请重新登录')
      userStore.logout()
      router.push('/login')
      return
    }
    alert('保存失败')
  }
}

// 取消弹窗
const cancel = () => {
  showAdd.value = false
}

// 页面初始化
onMounted(fetchAddressList)
</script>


<style scoped>
/* 样式保持原版 */
.content-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 32px 40px;
}
.content-title { margin: 0 0 8px; font-size: 20px; font-weight: 600; color: #111 }
.content-desc { margin: 0 0 20px; color: #999 }
.empty-wrap { display:flex; gap:16px; align-items:center }
.empty-tip { color: #999 }
.btn-primary { padding: 8px 16px; background: linear-gradient(135deg,#ff1268,#ff4d8a); color:#fff; border:none; border-radius:4px }
.list-wrap { display:flex; flex-direction:column; gap:12px }
.addr-item { display:flex; justify-content:space-between; align-items:center; padding:12px; border:1px solid #f0f0f0; border-radius:6px }
.addr-name { font-weight:600 }
.addr-phone { margin-left:8px; color:#666; font-weight:400 }
.addr-actions .btn-text { background:none; border:none; color:#ff1268; cursor:pointer; margin-left:8px }
.add-more { margin-top:12px }
.btn-add-more { padding:8px 12px; border:1px dashed #eee; background:#fff; border-radius:4px; cursor:pointer }
.plus { display:inline-block; width:18px; height:18px; line-height:18px; text-align:center; margin-right:6px; background:#ff1268; color:#fff; border-radius:50% }

.modal { position:fixed; left:0; right:0; top:0; bottom:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.4) }
.modal-inner { background:#fff; padding:20px; width:420px; border-radius:8px }
.form-item { margin-bottom:10px }
.form-item label { display:block; font-size:13px; color:#333; margin-bottom:6px }
.form-item input { width:100%; padding:8px; border:1px solid #eee; border-radius:4px }
.modal-actions { display:flex; gap:8px; justify-content:flex-end; margin-top:12px }
.btn { padding:8px 14px; border-radius:4px; background:#ff1268; color:#fff; border:none }
.btn-ghost { background:#fff; border:1px solid #eee }
</style>
