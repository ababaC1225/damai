<template>
  <UserCenterLayout>
    <div class="content-card">
      <h2 class="content-title">常用购票人</h2>
      <p class="content-desc">添加常用购票人信息，购票时可直接选择，无需重复填写</p>

      <div class="empty-tip-wrap">
        <p class="empty-tip">暂无常用购票人，添加后可节省填写时间</p>
        <button class="btn-primary" @click="add">添加购票人</button>
      </div>
    </div>
  </UserCenterLayout>
</template>

<script setup>
import UserCenterLayout from './UserCenterLayout.vue'
const add = () => {
  alert('示例：添加购票人逻辑（未实现）')
}
</script>

<style scoped>
.content-card { background:#fff; border:1px solid #eee; border-radius:4px; padding:32px 40px }
.content-title { margin:0 0 8px; font-size:20px; font-weight:600 }
.content-desc { margin:0 0 20px; color:#999 }
.empty-tip-wrap { display:flex; gap:16px; align-items:center }
.btn-primary { padding:8px 16px; background:linear-gradient(135deg,#ff1268,#ff4d8a); color:#fff; border:none; border-radius:4px }
</style>