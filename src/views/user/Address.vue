<template>
  <UserCenterLayout>
    <div class="content-card">
      <h2 class="content-title">收货地址</h2>
      <p class="content-desc">管理您的收货地址，购票后可快速选择配送地址</p>

      <div class="empty-wrap" v-if="addresses.length === 0">
        <p class="empty-tip">添加收货地址，购票后更方便收货</p>
        <button type="button" class="btn-primary" @click="openAdd">新增收货地址</button>
      </div>

      <div class="list-wrap" v-else>
        <div class="addr-item" v-for="(a, idx) in addresses" :key="idx">
          <div class="addr-main">
            <div class="addr-name">{{ a.name }} <span class="addr-phone">{{ a.phone }}</span></div>
            <div class="addr-detail">{{ a.region }} {{ a.detail }}</div>
          </div>
          <div class="addr-actions">
            <button class="btn-text" @click="edit(idx)">编辑</button>
            <button class="btn-text" @click="remove(idx)">删除</button>
          </div>
        </div>

        <div class="add-more">
          <button type="button" class="btn-add-more" @click="openAdd">
            <span class="plus">+</span> 新增收货地址
          </button>
        </div>
      </div>

      <div class="modal" v-if="showAdd">
        <div class="modal-inner">
          <h3>{{ editingIndex === -1 ? '新增收货地址' : '编辑收货地址' }}</h3>
          <div class="form-item">
            <label>收件人</label>
            <input v-model="form.name" />
          </div>
          <div class="form-item">
            <label>手机号</label>
            <input v-model="form.phone" />
          </div>
          <div class="form-item">
            <label>所在地区</label>
            <input v-model="form.region" placeholder="省/市/区" />
          </div>
          <div class="form-item">
            <label>详细地址</label>
            <input v-model="form.detail" />
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
import request from '@/untils/request'

const addresses = ref([])
const showAdd = ref(false)
const editingIndex = ref(-1)

const form = reactive({
  name: '',
  phone: '',
  region: '',
  detail: ''
})

/* ================= 获取地址列表 ================= */
const fetchAddressList = async () => {
  try {
    const res = await request.get('/api/address')

    if (res.code === 200) {
      // 后端字段 → 前端字段转换
      addresses.value = res.data.map(item => ({
        id: item.id,
        name: item.recipientName,
        phone: item.recipientPhone,
        region: `${item.province} ${item.city} ${item.district}`,
        detail: item.detailAddress,
        isDefault: item.isDefaultAddress === 'yes'
      }))
    }
  } catch (err) {
    console.log('获取地址失败', err)
  }
}

onMounted(() => {
  fetchAddressList()
})

/* ================= 以下是你原来的逻辑 ================= */

function openAdd() {
  editingIndex.value = -1
  form.name = form.phone = form.region = form.detail = ''
  showAdd.value = true
}

function edit(idx) {
  editingIndex.value = idx
  const a = addresses.value[idx]
  form.name = a.name
  form.phone = a.phone
  form.region = a.region
  form.detail = a.detail
  showAdd.value = true
}

function remove(idx) {
  addresses.value.splice(idx, 1)
}

function save() {
  const payload = {
    name: form.name,
    phone: form.phone,
    region: form.region,
    detail: form.detail
  }

  if (editingIndex.value === -1) {
    addresses.value.unshift(payload)
  } else {
    addresses.value[editingIndex.value] = payload
  }

  showAdd.value = false
}
</script>

<style scoped>
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