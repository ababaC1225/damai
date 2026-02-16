<template>
  <div class="box-header user-header" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
    @click="handleClick">
    <img class="i-box-header i-user"
      :src="isLogin ? userInfo.avatar : '//img.alicdn.com/tfs/TB14UKCGQyWBuNjy0FpXXassXXa-54-54.png'" alt="用户" />

    <div class="span-box-header">
      {{ isLogin ? userInfo.nickname : '登录' }}

      <div v-if="isLogin && showMenu" class="list-wrap-custom" @mouseenter="handleMenuEnter" @click.stop>
        <router-link to="/user/info" class="li-login">个人信息</router-link>
        <router-link to="/user/setting" class="li-login">账号设置</router-link>
        <router-link to="/user/order" class="li-login">订单管理</router-link>
        <div class="divider"></div>
        <div class="li-login out-login" @click.stop="handleLogout">
          退出登录
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const isLogin = computed(() => userStore.isLogin)
const userInfo = computed(() => userStore.userInfo)

const showMenu = ref(false)
let hideTimer = null

// 鼠标进入触发区
const handleMouseEnter = () => {
  if (!isLogin.value) return
  if (hideTimer) clearTimeout(hideTimer)
  showMenu.value = true
}

// 鼠标进入菜单区（防止在间隙处抖动）
const handleMenuEnter = () => {
  if (hideTimer) clearTimeout(hideTimer)
  showMenu.value = true
}

// 鼠标离开（给极短的缓冲，确保体验丝滑，如需绝对零延迟可设为 0）
const handleMouseLeave = () => {
  hideTimer = setTimeout(() => {
    showMenu.value = false
  }, 50)
}

const handleLogout = () => {
  userStore.logout()
  showMenu.value = false
  router.push('/')
}

const handleClick = () => {
  if (!isLogin.value) {
    router.push('/login')
  }
}
</script>

<style scoped>
.box-header {
  display: flex;
  align-items: center;
  margin-left: 24px;
  position: relative;
  cursor: pointer;
  height: 72px;
  /* 匹配 Header 高度 */
}

.i-box-header {
  width: 26px;
  height: 26px;
  display: inline-block;
  margin-right: 4px;
  vertical-align: middle;
}

.i-user {
  border-radius: 13px;
  object-fit: cover;
}

.span-box-header {
  font-size: 16px;
  color: #111;
  vertical-align: middle;
  position: relative;
  display: inline-block;
}

/* 下拉菜单基础样式 */
.list-wrap-custom {
  position: absolute;
  top: 100%;
  /* 在父容器底部出现 */
  left: 50%;
  transform: translateX(-50%);
  margin-top: 12px;
  /* 视觉上的间距 */

  padding: 10px 0;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 120px;
}

/* 关键修复：透明桥梁 */
/* 创建一个覆盖 margin-top 区域的透明层，防止鼠标滑过时菜单消失 */
.list-wrap-custom::before {
  content: "";
  position: absolute;
  top: -15px;
  /* 向上延伸盖住 margin-top 的空隙 */
  left: 0;
  width: 100%;
  height: 15px;
  background: transparent;
}

.list-wrap-custom .divider {
  height: 1px;
  background-color: #eee;
  margin: 6px 0;
}

.list-wrap-custom .li-login {
  display: block;
  padding: 8px 20px;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  text-decoration: none;
  transition: background 0.1s;
}

.list-wrap-custom .li-login:hover {
  background-color: #f5f5f5;
  color: #ff1268;
}

.list-wrap-custom .out-login {
  color: #666;
  cursor: pointer;
}

.list-wrap-custom .out-login:hover {
  color: #ff1268;
}
</style>