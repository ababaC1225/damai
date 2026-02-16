<template>
  <UserCenterLayout>
    <div class="content-card">
      <h2 class="content-title">订单管理</h2>
      <p class="content-desc">查看并管理您的订单记录</p>

      <div class="orders">
        <div class="order-item" v-for="order in orders" :key="order.id">
          <img class="thumb" :src="order.pic" alt="演出图" />
          <div class="order-body">
            <div class="title">{{ order.title }}</div>
            <div class="meta">金额：¥{{ order.amount }} · 状态：{{ order.status }}</div>
          </div>
          <div class="order-action">查看详情</div>
        </div>
      </div>
    </div>
  </UserCenterLayout>
</template>

<script setup>
import UserCenterLayout from './UserCenterLayout.vue'

const orders = [
  { id: 1, title: '演唱会门票 - 示例订单', amount: '580.00', pic: 'https://img.alicdn.com/tfs/TB1NkOydrus3KVjSZKbXXXqkFXa-720-400.png_q75.jpg', status: '待支付' },
  { id: 2, title: '音乐会门票 - 示例订单', amount: '320.00', pic: 'https://img.alicdn.com/tfs/TB1NkOydrus3KVjSZKbXXXqkFXa-720-400.png_q75.jpg', status: '已完成' },
]
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
