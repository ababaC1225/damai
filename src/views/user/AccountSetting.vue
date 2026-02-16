<template>
  <UserCenterLayout>
    <div class="content-card account-settings">
      <div class="header">
        <div>
          <h2 class="content-title">账号设置</h2>
          <p class="content-desc">管理账户安全与登录方式 — 建议至少绑定手机以保障账户安全</p>
        </div>

        <div class="security-summary">
          <div class="level">安全等级：<span :class="'badge ' + securityClass">{{ securityLabel }}</span></div>
          <div class="progress">
            <div class="bar"><div class="fill" :style="{ width: securityPercent + '%' }"></div></div>
          </div>
        </div>
      </div>

      <div class="setting-grid">
        <div class="setting-card">
          <div class="setting-left">
            <div class="label">登录密码</div>
            <div class="desc">定期更换密码可有效保护账户安全</div>
          </div>
          <div class="setting-right">
            <div class="value">********</div>
            <button class="btn btn-outline" @click="changePassword">修改</button>
          </div>
        </div>

        <div class="setting-card">
          <div class="setting-left">
            <div class="label">绑定手机</div>
            <div class="desc">用于找回密码、短信验证码与重要通知</div>
          </div>
          <div class="setting-right">
            <div class="value">{{ phoneBound ? phoneNumber : '未绑定' }}</div>
            <button class="btn" @click="toggleBindPhone">{{ phoneBound ? '修改' : '绑定' }}</button>
          </div>
        </div>

        <div class="setting-card">
          <div class="setting-left">
            <div class="label">绑定邮箱</div>
            <div class="desc">可用于接收订单和发票通知</div>
          </div>
          <div class="setting-right">
            <div class="value">{{ emailBound ? emailAddress : '未绑定' }}</div>
            <button class="btn" @click="toggleBindEmail">{{ emailBound ? '修改' : '绑定' }}</button>
          </div>
        </div>

        <div class="setting-card">
          <div class="setting-left">
            <div class="label">实名认证</div>
            <div class="desc">实名信息可用于购买实名制票务</div>
          </div>
          <div class="setting-right">
            <div class="value">{{ verified ? '已认证' : '未认证' }}</div>
            <button class="btn btn-outline" @click="verifyIdentity">{{ verified ? '查看' : '去认证' }}</button>
          </div>
        </div>
      </div>

      <div class="more-actions">
        <button class="link" @click="manageDevices">登录设备管理</button>
        <button class="link" @click="notificationSettings">通知设置</button>
      </div>
    </div>
  </UserCenterLayout>
</template>

<script setup>
import UserCenterLayout from './UserCenterLayout.vue'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const phoneBound = ref(false)
const emailBound = ref(false)
const phoneNumber = ref('')
const emailAddress = ref('')
const verified = ref(false)

const securityPercent = computed(() => {
  let score = 20
  if (phoneBound.value) score += 30
  if (emailBound.value) score += 20
  if (verified.value) score += 30
  return Math.min(score, 100)
})
const securityLabel = computed(() => {
  if (securityPercent.value >= 80) return '高'
  if (securityPercent.value >= 50) return '中'
  return '低'
})
const securityClass = computed(() => {
  if (securityPercent.value >= 80) return 'high'
  if (securityPercent.value >= 50) return 'medium'
  return 'low'
})

function changePassword() { alert('跳转到修改密码或打开模态（示例）') }
function toggleBindPhone() { phoneBound.value = !phoneBound.value; if (phoneBound.value) phoneNumber.value = '138****1234' }
function toggleBindEmail() { emailBound.value = !emailBound.value; if (emailBound.value) emailAddress.value = 'you@example.com' }
function verifyIdentity() { verified.value = true; alert('身份认证示例：已设置为已认证') }
function manageDevices() { alert('登录设备管理（示例）') }
function notificationSettings() { alert('通知设置（示例）') }
</script>

<style scoped>
.content-card { background: #fff; border: 1px solid #eee; border-radius: 8px; padding: 28px; box-shadow: 0 6px 18px rgba(12,12,12,0.04); }
.header { display:flex; justify-content:space-between; align-items:center; gap:20px; margin-bottom:22px }
.security-summary { text-align:right; min-width:220px }
.level { font-size:14px; color:#666; margin-bottom:8px; display:flex; align-items:center; gap:8px; justify-content:flex-end }
.badge { padding:6px 10px; border-radius:20px; color:#fff; font-weight:600; font-size:13px }
.badge.high { background: linear-gradient(90deg,#4ade80,#16a34a); }
.badge.medium { background: linear-gradient(90deg,#f59e0b,#fb923c); }
.badge.low { background: linear-gradient(90deg,#ef4444,#f97316); }
.progress .bar { width:200px; height:8px; background:#f3f4f6; border-radius:999px; overflow:hidden }
.progress .fill { height:100%; background: linear-gradient(90deg,#ff1268,#ff4d8a); width:0; transition:width 0.4s }
.setting-grid { display:grid; grid-template-columns: repeat(2,1fr); gap:14px }
@media (max-width: 760px) { .setting-grid { grid-template-columns: 1fr } .security-summary { text-align:left } .header { flex-direction:column; align-items:flex-start } }
.setting-card { display:flex; justify-content:space-between; align-items:center; gap:12px; padding:18px; border-radius:8px; border:1px solid #f1f5f9; box-shadow:0 2px 6px rgba(2,6,23,0.03) }
.setting-left .label { font-weight:600; color:#111 }
.setting-left .desc { color:#777; font-size:13px; margin-top:6px }
.setting-right { display:flex; align-items:center; gap:12px; flex-shrink:0 }
.value { color:#666; min-width:120px; text-align:right; font-weight:500 }
.btn { padding:8px 14px; border-radius:6px; border:none; background: linear-gradient(135deg,#ff1268,#ff4d8a); color:#fff; cursor:pointer; font-weight:600 }
.btn-outline { padding:7px 12px; border-radius:6px; border:1px solid #eee; background:#fff; color:#ff1268; cursor:pointer; font-weight:600 }
.more-actions { margin-top:18px; display:flex; gap:12px }
.link { background:none; border:none; color:#666; cursor:pointer; text-decoration:underline; font-size:14px }
</style>
