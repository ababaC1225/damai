<template>
    <aside class="category-sidebar">
        <div class="sidebar-section">
            <h4 class="sidebar-title">分类</h4>
            <ul class="category-list">
                <li v-for="c in categories" :key="c" :class="{ active: c === selected }" @click="select(c)">{{ c }}</li>
            </ul>
        </div>

        <div class="sidebar-section">
            <h4 class="sidebar-title">城市</h4>
            <ul class="category-list">
                <li v-for="city in cities" :key="city" :class="{ active: city === selectedCity }" @click="selectCity(city)">
                    {{ city }}</li>
            </ul>
        </div>
    </aside>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['update:category', 'update:city'])

const props = defineProps({
    modelValue: { type: String, default: '全部' },
    cityValue: { type: String, default: '全国' }
})

const categories = ['全部', '演唱会', '话剧歌剧', '音乐节', '体育赛事', '展览展会', '舞蹈芭蕾', '曲艺相声', '儿童亲子']
const cities = ['全国', '北京', '上海', '广州', '深圳', '杭州', '南京', '成都', '武汉']

const selected = ref(props.modelValue)
const selectedCity = ref(props.cityValue)

const select = (c) => {
    selected.value = c
    emit('update:category', c)
}

const selectCity = (city) => {
    selectedCity.value = city
    emit('update:city', city)
}
</script>

<style scoped>
.category-sidebar {
    width: 240px;
    padding: 16px;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 4px
}

.sidebar-section {
    margin-bottom: 16px
}

.sidebar-title {
    margin: 0 0 8px;
    font-size: 14px;
    color: #333
}

.category-list {
    list-style: none;
    padding: 0;
    margin: 0
}

.category-list li {
    padding: 8px 10px;
    cursor: pointer;
    color: #666;
    border-radius: 4px
}

.category-list li:hover {
    background: #f7f7f7;
    color: #ff1268
}

.category-list li.active {
    background: #ff1268;
    color: #fff
}
</style>
