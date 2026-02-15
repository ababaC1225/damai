// src/stores/counter.ts
import { defineStore } from 'pinia'

// 创建并导出一个名为 "useCounterStore" 的store
export const useCounterStore = defineStore('counter', {  // 'counter' 是store的唯一ID
  // 1. 状态 (state) - 相当于组件中的 data()
  state: () => ({ 
    count: 0  // 存储一个计数器数值，初始为0
  }),
  
  // 2. 动作 (actions) - 相当于组件中的 methods
  actions: {
    increment() {
      this.count++  // this 指向当前store的state
    }
  }
  
  // 还可以有 getters（计算属性）
})