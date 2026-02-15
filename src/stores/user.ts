import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false)
  const userInfo = ref({
    nickname: '',
    avatar: ''
  })

  const logout = () => {
    isLogin.value = false
    userInfo.value = {
      nickname: '',
      avatar: ''
    }
  }

  return {
    isLogin,
    userInfo,
    logout
  }
})
