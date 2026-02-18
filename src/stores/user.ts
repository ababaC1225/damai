// src/stores/user.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'damai_user'

export interface UserInfo {
  id?: number
  nickname: string
  avatar: string
  username?: string
}

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false)
  const userInfo = ref<UserInfo>({ nickname: '', avatar: '', username: '' })

  // 从 localStorage 恢复状态
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      if (parsed.isLogin && parsed.userInfo) {
        isLogin.value = parsed.isLogin
        userInfo.value = parsed.userInfo
      }
    } catch (e) {
      console.warn('恢复用户状态失败', e)
    }
  }

  // 同步到 localStorage
  const persist = () => {
    if (isLogin.value) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ isLogin: true, userInfo: userInfo.value }))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  watch([isLogin, userInfo], persist, { deep: true, immediate: true })

  // 退出登录
  const logout = () => {
    isLogin.value = false
    userInfo.value = { nickname: '', avatar: '', username: '' }
    persist()
  }

  return { isLogin, userInfo, persist, logout }
})
