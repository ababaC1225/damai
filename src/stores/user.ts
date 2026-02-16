import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'damai_user'

function getStoredUser(): { isLogin: boolean; userInfo: { nickname: string; avatar: string } } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (data && typeof data.isLogin === 'boolean' && data.userInfo) return data
    return null
  } catch {
    return null
  }
}

export const useUserStore = defineStore('user', () => {
  const stored = getStoredUser()
  const defaultUserInfo = { nickname: '', avatar: '' }
  const isLogin = ref(stored?.isLogin ?? false)
  const userInfo = ref(
    stored?.userInfo && typeof stored.userInfo === 'object'
      ? { nickname: stored.userInfo.nickname ?? '', avatar: stored.userInfo.avatar ?? '' }
      : defaultUserInfo
  )

  const persist = () => {
    if (isLogin.value) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ isLogin: true, userInfo: userInfo.value }))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  // 状态变化时同步到 localStorage（含初始化时恢复后的同步）
  watch([isLogin, userInfo], persist, { deep: true, immediate: true })

  const logout = () => {
    isLogin.value = false
    userInfo.value = { nickname: '', avatar: '' }
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    isLogin,
    userInfo,
    persist,
    logout
  }
})
