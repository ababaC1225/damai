<template>
    <div class="search-page" ref="rootRef">
        <!-- 头部导航 -->
        <div class="search-header">
            <div class="search-header-top">
                <span class="breadcrumb">首页</span>
                <span class="breadcrumb-divider">/</span>
                <span class="breadcrumb">搜索结果</span>
            </div>

            <!-- 筛选条件 -->
            <div class="filter-bar">
                <div class="filter-item" ref="cityRef">
                    <span class="filter-label">城市：</span>
                    <span class="filter-value" @click="toggleCityDropdown">
                        {{ selectedCity }}
                        <img class="arrow-icon" src="https://img.alicdn.com/tfs/TB1vnUBxStYBeNjSspaXXaOOFXa-20-12.png"
                            alt="箭头">
                    </span>
                    <div class="dropdown-menu" v-if="showCityDropdown">
                        <span class="dropdown-item" @click="selectCity('全国')">全国</span>
                        <span class="dropdown-item" @click="selectCity('北京')">北京</span>
                        <span class="dropdown-item" @click="selectCity('上海')">上海</span>
                        <span class="dropdown-item" @click="selectCity('广州')">广州</span>
                        <span class="dropdown-item" @click="selectCity('深圳')">深圳</span>
                        <span class="dropdown-item" @click="selectCity('杭州')">杭州</span>
                        <span class="dropdown-item" @click="selectCity('南京')">南京</span>
                        <span class="dropdown-item" @click="selectCity('成都')">成都</span>
                        <span class="dropdown-item" @click="selectCity('武汉')">武汉</span>
                    </div>
                </div>

                <div class="filter-item" ref="categoryRef">
                    <span class="filter-label">分类：</span>
                    <span class="filter-value" @click="toggleCategoryDropdown">
                        {{ selectedCategory }}
                        <img class="arrow-icon" src="https://img.alicdn.com/tfs/TB1vnUBxStYBeNjSspaXXaOOFXa-20-12.png"
                            alt="箭头">
                    </span>
                    <div class="dropdown-menu" v-if="showCategoryDropdown">
                        <span class="dropdown-item" @click="selectCategory('全部')">全部</span>
                        <span class="dropdown-item" @click="selectCategory('演唱会')">演唱会</span>
                        <span class="dropdown-item" @click="selectCategory('话剧歌剧')">话剧歌剧</span>
                        <span class="dropdown-item" @click="selectCategory('音乐节')">音乐节</span>
                        <span class="dropdown-item" @click="selectCategory('体育赛事')">体育赛事</span>
                        <span class="dropdown-item" @click="selectCategory('展览展会')">展览展会</span>
                        <span class="dropdown-item" @click="selectCategory('舞蹈芭蕾')">舞蹈芭蕾</span>
                        <span class="dropdown-item" @click="selectCategory('曲艺相声')">曲艺相声</span>
                        <span class="dropdown-item" @click="selectCategory('儿童亲子')">儿童亲子</span>
                    </div>
                </div>

                <div class="filter-item" ref="timeRef">
                    <span class="filter-label">时间：</span>
                    <span class="filter-value" @click="toggleTimeDropdown">
                        {{ selectedTime }}
                        <img class="arrow-icon" src="https://img.alicdn.com/tfs/TB1vnUBxStYBeNjSspaXXaOOFXa-20-12.png"
                            alt="箭头">
                    </span>
                    <div class="dropdown-menu" v-if="showTimeDropdown">
                        <span class="dropdown-item" @click="selectTime('全部')">全部</span>
                        <span class="dropdown-item" @click="selectTime('今天')">今天</span>
                        <span class="dropdown-item" @click="selectTime('明天')">明天</span>
                        <span class="dropdown-item" @click="selectTime('本周末')">本周末</span>
                        <span class="dropdown-item" @click="selectTime('一个月内')">一个月内</span>
                    </div>
                </div>
            </div>

            <!-- 排序选项 -->
            <div class="sort-bar">
                <span class="sort-label">排序：</span>
                <span v-for="option in sortOptions" :key="option"
                    :class="['sort-item', { active: selectedSort === option }]" @click="selectedSort = option">
                    {{ option }}
                </span>
            </div>

            <!-- 结果数量 -->
            <div class="result-info">
                共找到 <span class="count">{{ events.length }}</span> 个演出
            </div>
        </div>

        <!-- 演出列表 -->
        <div class="events-container">
            <div v-if="events.length > 0" class="events-grid">
                <div v-for="event in filteredEvents" :key="event.id" class="event-card">
                    <div class="event-image">
                        <img :src="event.image" :alt="event.title">
                        <div class="event-status" v-if="event.soldOut" style="background: rgba(0,0,0,0.5);">
                            <span>已售罄</span>
                        </div>
                        <div class="event-discount" v-if="event.discount">
                            <span>{{ event.discount }}</span>
                        </div>
                    </div>
                    <div class="event-info">
                        <h3 class="event-title">{{ event.title }}</h3>
                        <p class="event-date">
                            <img src="https://img.alicdn.com/tfs/TB1XHDuxNGYBuNjy0FnXXX5lpXa-28-32.png" alt="日期"
                                class="icon-small">
                            {{ event.date }}
                        </p>
                        <p class="event-location">
                            <img src="https://img.alicdn.com/tfs/TB1XHDuxNGYBuNjy0FnXXX5lpXa-28-32.png" alt="地点"
                                class="icon-small">
                            {{ event.location }}
                        </p>
                        <div class="event-price">
                            <span class="price-from">¥</span>
                            <span class="price-value">{{ event.price }}</span>
                            <span class="price-text">起</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="empty-state">
                <p>暂无演出</p>
            </div>
        </div>

        <!-- 分页 -->
        <div class="pagination" v-if="events.length > 0">
            <button class="pagination-btn" :disabled="currentPage === 1" @click="currentPage--">上一页</button>
            <span class="pagination-info">
                第 {{ currentPage }} / {{ totalPages }} 页
            </span>
            <button class="pagination-btn" :disabled="currentPage === totalPages" @click="currentPage++">下一页</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import request from '@/untils/request'
import SearchBar from '@/components/SearchBar/SearchBar.vue'

const currentPage = ref(1)
const itemsPerPage = 12

// 来自路由的关键词（Header 搜索框会通过路由 query 传入）
const route = useRoute()
const searchQuery = ref('')

const selectedCity = ref('全国')
const selectedCategory = ref('全部')
const selectedTime = ref('全部')
const selectedSort = ref('推荐排序')

const showCityDropdown = ref(false)
const showCategoryDropdown = ref(false)
const showTimeDropdown = ref(false)

// 根节点引用，用于检测是否点击在组件外部
const rootRef = ref(null)

// individual refs for each dropdown container
const cityRef = ref(null)
const categoryRef = ref(null)
const timeRef = ref(null)

const handleDocumentClick = (e) => {
    const target = e.target
    // 城市下拉：如果已打开且点击点不在 cityRef 内，则关闭
    if (showCityDropdown.value && cityRef.value && !cityRef.value.contains(target)) {
        showCityDropdown.value = false
    }
    // 分类下拉
    if (showCategoryDropdown.value && categoryRef.value && !categoryRef.value.contains(target)) {
        showCategoryDropdown.value = false
    }
    // 时间下拉
    if (showTimeDropdown.value && timeRef.value && !timeRef.value.contains(target)) {
        showTimeDropdown.value = false
    }
}

onMounted(() => document.addEventListener('click', handleDocumentClick, true))
onBeforeUnmount(() => document.removeEventListener('click', handleDocumentClick, true))

// 初始加载数据
onMounted(() => {
    const q = route && route.query && route.query.keyword
    if (q) searchQuery.value = String(q)
    fetchPerformances()
})

// 当筛选或分页变动时重新拉取
watch([selectedCity, selectedCategory, currentPage], () => {
    // 将 currentPage 保持在 1 时，fetchPerformances 会使用 currentPage
    fetchPerformances()
})

const sortOptions = ['推荐排序', '相关度排序', '最近开场', '最新上架']

// 切换为后端数据
const events = ref([])
const total = ref(0)
const apiPages = ref(1)

const BASE_URL = 'http://193.112.68.157:8080'

const formatResourceUrl = (url) => {
    if (!url) return ''
    if (typeof url !== 'string') return ''
    if (url.startsWith('http')) return url
    // 防止重复斜杠
    if (url.startsWith('/')) return BASE_URL + url
    return BASE_URL + '/' + url
}

const mapRecordToEvent = (rec) => {
    // 后端可能使用不同字段名保存海报：image / poster / cover
    const posterCandidate = rec.image || rec.poster || rec.cover || ''
    let imageUrl = posterCandidate ? formatResourceUrl(posterCandidate) : ''
    if (!imageUrl) {
        imageUrl = `https://dummyimage.com/200x280/FF1268/FFFFFF?text=${encodeURIComponent(rec.title || 'Event')}`
    }

    return {
        id: rec.id,
        title: rec.title,
        image: imageUrl,
        date: rec.ticketStartTime || rec.createdTime || '',
        location: rec.city ? `${rec.city}` : '',
        price: rec.price || '--',
        soldOut: rec.status === 0 ? true : false,
        discount: rec.discount || null,
        category: rec.category || '',
        city: rec.city || ''
    }
}

const fetchPerformances = async () => {
    try {
        const params = {
            pageNum: currentPage.value
        }
        // 将路由或页面中的搜索关键词传给后端
        if (selectedCity.value && selectedCity.value !== '全国') params.city = selectedCity.value
        if (selectedCategory.value && selectedCategory.value !== '全部') params.category = selectedCategory.value

        let res
        if (searchQuery.value && String(searchQuery.value).trim() !== '') {
            // 使用专用搜索接口：按演出名/明星名查询
            const kw = encodeURIComponent(String(searchQuery.value).trim())
            res = await request.get(`/api/performance/search/${kw}`, { params })
        } else {
            res = await request.get('/api/performance', { params })
        }
        if (res && res.code === 200 && res.data) {
            const data = res.data
            total.value = data.total || (data.records ? data.records.length : 0)
            apiPages.value = data.pages || 1
            events.value = (data.records || []).map(mapRecordToEvent)
        } else {
            // 后端返回异常，清空列表
            events.value = []
            total.value = 0
            apiPages.value = 1
        }
    } catch (err) {
        console.error('获取演出列表失败', err)
        events.value = []
        total.value = 0
        apiPages.value = 1
    }
}


// 筛选后的演出（当使用后端时，events 已经是按条件返回的）
const filteredEvents = computed(() => {
    // 前端仍保留对筛选的守护（当后端不可用时）
    let filtered = events.value
    if (selectedCity.value !== '全国') filtered = filtered.filter(e => e.city === selectedCity.value)
    if (selectedCategory.value !== '全部') filtered = filtered.filter(e => e.category === selectedCategory.value)
    return filtered
})

// 监听路由 keyword 变化（例如从 Header 搜索框跳转过来）
watch(() => route.query.keyword, (newK) => {
    searchQuery.value = newK || ''
    currentPage.value = 1
    fetchPerformances()
})

// 总页数：优先使用后端分页信息 `apiPages`，否则本地计算
const totalPages = computed(() => apiPages.value || Math.max(1, Math.ceil(filteredEvents.value.length / itemsPerPage)))

const paginatedEvents = computed(() => {
    // 如果后端返回了分页数据，则 events 已是当前页的数据
    if (apiPages.value && events.value.length <= itemsPerPage) return events.value
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredEvents.value.slice(start, end)
})

// 切换下拉菜单
const toggleCityDropdown = () => {
    showCityDropdown.value = !showCityDropdown.value
    showCategoryDropdown.value = false
    showTimeDropdown.value = false
}

const toggleCategoryDropdown = () => {
    showCategoryDropdown.value = !showCategoryDropdown.value
    showCityDropdown.value = false
    showTimeDropdown.value = false
}

const toggleTimeDropdown = () => {
    showTimeDropdown.value = !showTimeDropdown.value
    showCityDropdown.value = false
    showCategoryDropdown.value = false
}

// 选择筛选条件
const selectCity = (city) => {
    selectedCity.value = city
    showCityDropdown.value = false
    currentPage.value = 1
}

const selectCategory = (category) => {
    selectedCategory.value = category
    showCategoryDropdown.value = false
    currentPage.value = 1
}

const selectTime = (time) => {
    selectedTime.value = time
    showTimeDropdown.value = false
    currentPage.value = 1
}
</script>

<style scoped>
.search-page {
    background-color: #f5f5f5;
    padding-bottom: 40px;
}

.search-header {
    background-color: #fff;
    border-bottom: 1px solid #e8e8e8;
}

.search-header-top {
    padding: 20px 40px;
    font-size: 14px;
    color: #666;
}

.breadcrumb {
    cursor: pointer;
}

.breadcrumb:hover {
    color: #ff1268;
}

.breadcrumb-divider {
    margin: 0 8px;
    color: #999;
}

/* 筛选条件 */
.filter-bar {
    padding: 20px 40px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
}

.filter-item {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
}

.filter-label {
    color: #999;
    font-size: 14px;
    min-width: 40px;
}

.filter-value {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #333;
    cursor: pointer;
    font-size: 14px;
    border-bottom: 1px solid transparent;
    transition: all 0.3s;
    padding-bottom: 2px;
}

.filter-value:hover {
    color: #ff1268;
    border-bottom-color: #ff1268;
}

.arrow-icon {
    width: 12px;
    height: 8px;
    display: inline-block;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 40px;
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    min-width: 120px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;
    margin-top: 5px;
}

.dropdown-item {
    display: block;
    padding: 10px 15px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0;
    transition: all 0.3s;
}

.dropdown-item:last-child {
    border-bottom: none;
}

.dropdown-item:hover {
    background-color: #f5f5f5;
    color: #ff1268;
}

/* 排序 */
.sort-bar {
    padding: 15px 40px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    gap: 20px;
    align-items: center;
    font-size: 14px;
}

.sort-label {
    color: #999;
    min-width: 40px;
}

.sort-item {
    color: #666;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 4px;
    transition: all 0.3s;
}

.sort-item:hover {
    color: #ff1268;
}

.sort-item.active {
    color: #ff1268;
    background-color: #ffe8f0;
}

/* 结果信息 */
.result-info {
    padding: 15px 40px;
    font-size: 14px;
    color: #666;
}

.count {
    color: #ff1268;
    font-weight: bold;
}

/* 演出网格 */
.events-container {
    padding: 40px;
    max-width: 1400px;
    margin: 0 auto;
}

.events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.event-card {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
}

.event-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);
}

.event-image {
    position: relative;
    width: 100%;
    padding-bottom: 140%;
    overflow: hidden;
    background: #f0f0f0;
}

.event-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.event-status,
.event-discount {
    position: absolute;
    top: 0;
    right: 0;
    background: #ff1268;
    color: #fff;
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 0 0 0 4px;
}

.event-discount {
    top: auto;
    right: auto;
    bottom: 0;
    left: 0;
    background: rgba(255, 18, 104, 0.9);
    border-radius: 0 4px 0 0;
}

.event-info {
    padding: 12px;
}

.event-title {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin: 0 0 8px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
}

.event-date,
.event-location {
    font-size: 12px;
    color: #999;
    margin: 4px 0;
    display: flex;
    align-items: center;
    gap: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.icon-small {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
}

.event-price {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #f0f0f0;
    color: #ff1268;
    font-size: 14px;
    font-weight: bold;
}

.price-from {
    font-size: 12px;
}

.price-value {
    font-size: 18px;
}

.price-text {
    font-size: 12px;
    margin-left: 2px;
}

/* 空状态 */
.empty-state {
    text-align: center;
    padding: 80px 40px;
    color: #999;
    font-size: 16px;
}

/* 分页 */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 40px;
}

.pagination-btn {
    padding: 8px 24px;
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled) {
    border-color: #ff1268;
    color: #ff1268;
}

.pagination-btn:disabled {
    color: #ccc;
    cursor: not-allowed;
    background-color: #f5f5f5;
}

.pagination-info {
    color: #666;
    font-size: 14px;
    min-width: 120px;
    text-align: center;
}

@media (max-width: 1200px) {
    .events-grid {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }
}

@media (max-width: 768px) {
    .search-header {
        padding: 0;
    }

    .filter-bar,
    .sort-bar {
        padding: 12px 20px;
        gap: 15px;
        font-size: 12px;
    }

    .events-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 12px;
        padding: 20px;
    }

    .search-header-top {
        padding: 12px 20px;
        font-size: 12px;
    }
}
</style>
