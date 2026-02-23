<template>
    <div class="search-bar">
        <input v-model="q" @keyup.enter="emitSearch" @input="onInput" :placeholder="placeholder" class="search-input" />
        <button class="btn-search" @click="emitSearch">搜索</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { debounce } from 'lodash-es'

defineProps({
    placeholder: { type: String, default: '搜索明星、演出、体育赛事' },
    modelValue: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'search'])

const q = ref('')

// 初始化时同步外部值
if (typeof __VUE_SSR_CONTEXT__ === 'undefined') {
    // non-SSR runtime
    q.value = ''
}

const debouncedEmit = debounce(() => {
    emit('update:modelValue', q.value)
    emit('search', q.value)
}, 350)

const onInput = () => {
    debouncedEmit()
}

const emitSearch = () => {
    // 立即触发
    debouncedEmit.cancel()
    emit('update:modelValue', q.value)
    emit('search', q.value)
}
</script>

<style scoped>
.search-bar {
    display: flex;
    gap: 8px;
    align-items: center
}

.search-input {
    flex: 1;
    height: 34px;
    padding: 6px 10px;
    border: 1px solid #ddd;
    border-radius: 4px
}

.btn-search {
    height: 34px;
    padding: 0 12px;
    background: linear-gradient(135deg, #ff1268, #ff4d8a);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer
}
</style>
