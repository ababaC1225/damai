<template>
  <UserCenterLayout>
    <el-card class="content-card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <h2 class="content-title">订单详情</h2>
        <el-button size="small" @click="goBack">返回</el-button>
      </div>

      <div v-if="order">
        <el-descriptions title="基本信息" :column="2" border>
          <el-descriptions-item label="订单号">{{ order.orderNo }}</el-descriptions-item>
          <el-descriptions-item label="名称">{{ order.orderName }}</el-descriptions-item>
          <el-descriptions-item label="用户邮箱">{{ order.userEmail }}</el-descriptions-item>
          <el-descriptions-item label="数量">{{ order.quantity }}</el-descriptions-item>
          <el-descriptions-item label="总额">¥{{ order.totalAmount }}</el-descriptions-item>
          <el-descriptions-item label="状态">{{ statusLabel(order.status) }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ formatDate(order.createTime) }}</el-descriptions-item>
          <el-descriptions-item label="支付时间">{{ formatDate(order.paymentTime) }}</el-descriptions-item>
          <el-descriptions-item label="取消时间">{{ formatDate(order.cancelTime) }}</el-descriptions-item>
          <el-descriptions-item label="取消原因">{{ order.cancelReason }}</el-descriptions-item>
        </el-descriptions>

        <div style="margin-top:12px">
          <el-space>
            <el-button type="danger" @click="cancelOrder">取消订单</el-button>
            <el-button type="warning" @click="deleteOrder">删除订单</el-button>
          </el-space>
        </div>
      </div>

      <div v-else>
        <el-empty description="加载中..." />
      </div>
    </el-card>
  </UserCenterLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserCenterLayout from './UserCenterLayout.vue'
import request from '@/untils/request'
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()
const order = ref(null)

function formatDate(v) {
  if (!v) return ''
  try { const d = new Date(v); if (Number.isNaN(d.getTime())) return v; return d.toLocaleString() } catch (e) { return v }
}
function statusLabel(s) { if (!s) return '未知'; const map = { WITHHOLD: '待支付', PAID: '已支付', CANCELED: '已取消' }; return map[s] || s }

async function loadDetail() {
  try {
    const id = route.params.id
    if (!id) return
    const res = await request.get(`/api/order/${id}/details`)
    const data = res && res.data ? res.data : res
    order.value = data
  } catch (e) {
    ElMessage.error('获取详情失败')
  }
}

function goBack() { router.back() }

async function cancelOrder() {
  try {
    await ElMessageBox.confirm('确认取消此订单？', '确认')
    const id = order.value.id
    const resp = await request.put('/api/orde/cancel', null, { params: { id } })
    if (resp && (resp.code === 0 || resp.code === 200 || resp.code == null)) {
      ElMessage.success('取消成功')
      await loadDetail()
    } else {
      ElMessage.error(resp && resp.message ? resp.message : '取消失败')
    }
  } catch (e) {}
}

async function deleteOrder() {
  try {
    await ElMessageBox.confirm('确认删除此订单？此操作不可恢复。', '删除')
    const id = order.value.id
    const resp = await request.delete(`/api/order/${id}/delete`)
    if (resp && (resp.code === 0 || resp.code === 200 || resp.code == null)) {
      ElMessage.success('删除成功')
      router.push('/user/order')
    } else {
      ElMessage.error(resp && resp.message ? resp.message : '删除失败')
    }
  } catch (e) {}
}

onMounted(() => loadDetail())
</script>
