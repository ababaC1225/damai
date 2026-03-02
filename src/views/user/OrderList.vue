<template>
  <UserCenterLayout>
    <div class="content-card">
      <h2 class="content-title">订单管理</h2>
      <p class="content-desc">查看并管理您的订单记录</p>

      <div style="display:flex;gap:12px;align-items:center;margin:12px 0;">
        <el-input v-model="search" placeholder="按演出名称搜索" clearable style="flex:1" @keyup.enter="searchOrders">
          <template #append>
            <el-button type="primary" @click="searchOrders">搜索</el-button>
          </template>
        </el-input>
      </div>

      <div class="orders">
        <div v-if="orders.length === 0">
          <el-empty description="暂无订单" />
        </div>
        <div class="order-item" v-for="order in orders" :key="order.id" @click="goDetail(order)" style="cursor:pointer">
          <img v-if="order.pic" class="thumb" :src="order.pic" alt="演出图" />
          <div class="order-body">
            <div class="title">{{ order.orderName || order.title || order.orderNo }}</div>
            <div class="meta">金额：¥{{ order.totalAmount ?? order.amount }} · 状态：{{ statusLabel(order.status) }}</div>
          </div>
          <div class="order-action">查看详情</div>
        </div>
      </div>

      <div style="display:flex;justify-content:center;margin-top:16px">
        <el-pagination background :current-page="page" :page-size="pageSize" :total="total" layout="prev, pager, next, jumper, ->, total" @current-change="onPageChange" />
      </div>
    </div>
  </UserCenterLayout>
</template>

<script setup>
import UserCenterLayout from './UserCenterLayout.vue'
import { ref, onMounted } from 'vue'
import request from '@/untils/request'
import { useRouter } from 'vue-router'

const orders = ref([])
const page = ref(1)
const pageSize = ref(10)
const pages = ref(1)
const total = ref(0)
const search = ref('')
const router = useRouter()

function statusLabel(s) {
  if (!s) return '未知'
  const map = { WITHHOLD: '待支付', PAID: '已支付', CANCELED: '已取消' }
  return map[s] || s
}

async function loadOrders() {
  try {
    const params = { pageNum: page.value }
    if (search.value && search.value.trim()) params.performanceTitle = search.value.trim()
    const res = await request.get('/api/order', { params })
    const data = res && res.data ? res.data : res
    let list = []
    if (data) {
      if (Array.isArray(data.records)) {
        list = data.records
        total.value = data.total ?? data.records.length
        pages.value = data.pages ?? Math.ceil(total.value / pageSize.value)
      } else if (Array.isArray(data)) {
        list = data
        total.value = data.length
        pages.value = Math.ceil(total.value / pageSize.value)
      }
    }
    // normalize
    orders.value = (list || []).map((it, idx) => {
      if (typeof it === 'string') return { id: idx + 1, orderName: it }
      return {
        id: it.id ?? it.orderId ?? idx + 1,
        orderNo: it.orderNo ?? it.order_no,
        orderName: it.orderName ?? it.order_name ?? it.title ?? it.name,
        totalAmount: it.totalAmount ?? it.amount,
        status: it.status,
        pic: it.pic ?? it.image ?? null,
      }
    })
  } catch (e) {
    console.error('加载订单失败', e)
  }
}

function goDetail(order) {
  router.push(`/user/order/${order.id}`)
}

function onPageChange(p) { page.value = p; loadOrders() }

function searchOrders() { page.value = 1; loadOrders() }

onMounted(() => { loadOrders() })
</script>

<style scoped>
.content-card { background:#fff; border:1px solid #eee; border-radius:4px; padding:32px 40px }
.content-title { margin:0 0 8px; font-size:20px; font-weight:600 }
.content-desc { margin:0 0 20px; color:#999 }
.orders { display:flex; flex-direction:column; gap:12px }
.order-item { display:flex; gap:16px; align-items:center; padding:12px; border:1px solid #f5f5f5; border-radius:8px }
.thumb { width:120px; height:64px; object-fit:cover; border-radius:4px }
.order-body { flex:1; min-width:0 }
.title { font-weight:600; color:#111 }
.meta { color:#888; margin-top:6px }
.order-action { color:#ff1268; cursor:pointer }
</style>
