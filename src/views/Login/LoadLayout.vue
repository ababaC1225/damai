<script setup>
import Header from '@/views/Login/components/Header.vue';
import Footer from '@/views/Login/components/Footer.vue';
import { loginApi } from '/mock/user.js'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const handleLogin = async () => {
  const res = await loginApi({
    username: 'admin',
    password: '123456'
  })

  if (res.data.code === 200) {
    userStore.isLogin = true
    userStore.userInfo = res.data.data
    userStore.persist()
  } else {
    alert(res.data.message)
  }
}

</script>

<template>
  <div class="layout">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
