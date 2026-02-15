<template>
  <div class="box-header user-header" @click="toggleMenu">
    <img class="i-box-header i-user"
      :src="isLogin ? userInfo.avatar : '//img.alicdn.com/tfs/TB14UKCGQyWBuNjy0FpXXassXXa-54-54.png'" alt="用户" />
    <span class="span-box-header">
      {{ isLogin ? userInfo.nickname : '登录' }}
    </span>

    <!-- 登录后才显示菜单 -->
    <transition name="fade">
      <div v-if="isLogin && showMenu" class="list-wrap-custom">
        <router-link to="/user/info" class="li-login">个人信息</router-link>
        <router-link to="/user/setting" class="li-login">账号设置</router-link>
        <router-link to="/user/order" class="li-login">订单管理</router-link>
        <div class="divider"></div>
        <div class="li-login out-login" @click.stop="handleLogout">
          退出登录
        </div>
      </div>
    </transition>
  </div>
</template>


<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const isLogin = computed(() => userStore.isLogin)
const userInfo = computed(() => userStore.userInfo)

const showMenu = ref(false)
const wrapperRef = ref(null)

const toggleMenu = () => {
  if (!isLogin.value) {
    router.push('/login')
    return
  }
  showMenu.value = !showMenu.value
}

const handleClickOutside = (e) => {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target)) {
    showMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleLogout = () => {
  userStore.logout()
  showMenu.value = false
  router.push('/')
}
</script>

<style scoped>
.box-header {
  display: flex;
  align-items: center;
  margin-left: 24px;
  position: relative;
  cursor: pointer;
}

.i-box-header {
  width: 26px;
  z-index: 20000;
  display: inline-block;
  margin-right: 4px;
  vertical-align: middle;
}

.i-user {
  border-radius: 13px;
}

.span-box-header {
  font-size: 16px;
  color: #111;
  vertical-align: middle;
}

.list-wrap-custom {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  min-width: 120px;
  z-index: 1000;
}

.list-wrap-custom .divider {
  height: 1px;
  background-color: #eee;
  margin: 4px 0;
}

.list-wrap-custom .li-login {
  display: block;
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  text-decoration: none;
}

.list-wrap-custom .li-login:hover {
  background-color: #f5f5f5;
}

.list-wrap-custom .out-login {
  color: #ff1268;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
