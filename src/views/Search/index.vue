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
                        <img class="arrow-icon" src="https://img.alicdn.com/tfs/TB1vnUBxStYBeNjSspaXXaOOFXa-20-12.png" alt="箭头">
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
                        <img class="arrow-icon" src="https://img.alicdn.com/tfs/TB1vnUBxStYBeNjSspaXXaOOFXa-20-12.png" alt="箭头">
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
                        <img class="arrow-icon" src="https://img.alicdn.com/tfs/TB1vnUBxStYBeNjSspaXXaOOFXa-20-12.png" alt="箭头">
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
                <span 
                    v-for="option in sortOptions"
                    :key="option"
                    :class="['sort-item', { active: selectedSort === option }]"
                    @click="selectedSort = option"
                >
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
                <div 
                    v-for="event in filteredEvents"
                    :key="event.id"
                    class="event-card"
                >
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
                            <img src="https://img.alicdn.com/tfs/TB1XHDuxNGYBuNjy0FnXXX5lpXa-28-32.png" alt="日期" class="icon-small">
                            {{ event.date }}
                        </p>
                        <p class="event-location">
                            <img src="https://img.alicdn.com/tfs/TB1XHDuxNGYBuNjy0FnXXX5lpXa-28-32.png" alt="地点" class="icon-small">
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const currentPage = ref(1)
const itemsPerPage = 12

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

const sortOptions = ['推荐排序', '相关度排序', '最近开场', '最新上架']

// Mock 演出数据
const events = ref([
    {
        id: 1,
        title: '2024年《麻辣烫》春季巡演-北京站',
        image: 'https://dummyimage.com/200x280/FF1268/FFFFFF?text=Event+1',
        date: '2024-03-15 19:30',
        location: '北京·朝阳剧场',
        price: '180',
        soldOut: false,
        discount: null,
        category: '演唱会',
        city: '北京'
    },
    {
        id: 2,
        title: '【一起唱•广州】2024年新年演唱会',
        image: 'https://dummyimage.com/200x280/FF1268/FFFFFF?text=Event+2',
        date: '2024-03-16 20:00',
        location: '广州·体育中心',
        price: '280',
        soldOut: true,
        discount: null,
        category: '演唱会',
        city: '广州'
    },
    {
        id: 3,
        title: '话剧《人间草木》',
        image: 'https://dummyimage.com/200x280/FF1268/FFFFFF?text=Event+3',
        date: '2024-03-17 19:00',
        location: '上海·大剧院',
        price: '150',
        soldOut: false,
        discount: '8折',
        category: '话剧歌剧',
        city: '上海'
    },
    {
        id: 4,
        title: '2024武汉音乐节',
        image: 'https://dummyimage.com/200x280/FF1268/FFFFFF?text=Event+4',
        date: '2024-03-18 18:00',
        location: '武汉·东湖生态文化公园',
        price: '99',
        soldOut: false,
        discount: null,
        category: '音乐节',
        city: '武汉'
    },
    {
        id: 5,
        title: '2024中国足协杯-八强赛',
        image: 'https://dummyimage.com/200x280/FF1268/FFFFFF?text=Event+5',
        date: '2024-03-19 19:35',
        location: '上海·浦东足球场',
        price: '128',
        soldOut: false,
        discount: null,
        category: '体育赛事',
        city: '上海'
    },
    {
        id: 6,
        title: '展览：《紫禁城里过大年》',
        image: 'https://dummyimage.com/200x280/FF1268/FFFFFF?text=Event+6',
        date: '2024-03-20 09:00',
        location: '北京·故宫博物院',
        price: '60',
        soldOut: false,
        discount: null,
        category: '展览展会',
        city: '北京'
    },
    {
        id: 7,
        title: '芭蕾《天鹅湖》',
        image: 'https://dummyimage.com/200x280/FF1268/FFFFFF?text=Event+7',
        date: '2024-03-21 19:30',
        location: '北京·国家大剧院',
        price: '280',
        soldOut: false,
        discount: '7折',
        category: '舞蹈芭蕾',
        city: '北京'
    },
    {
        id: 8,
        title: '相声小品专场',
        image: 'https://dummyimage.com/200x280/FF1268/FFFFFF?text=Event+8',
        date: '2024-03-22 19:00',
        location: '深圳·音乐厅',
        price: '120',
        soldOut: false,
        discount: null,
        category: '曲艺相声',
        city: '深圳'
    },
    {
        id: 9,
        title: '儿童剧《白雪公主》',
        image: 'https://dummyimage.com/200x280/FF1268/FFFFFF?text=Event+9',
        date: '2024-03-23 14:00',
        location: '杭州·浙江小百花越剧院',
        price: '80',
        soldOut: false,
        discount: null,
        category: '儿童亲子',
        city: '杭州'
    },
    {
        id: 10,
        title: '2024演唱会新春特别场',
        image: 'https://dummyimage.com/200x280/FF1268/FFFFFF?text=Event+10',
        date: '2024-03-24 20:00',
        location: '北京·鸟巢',
        price: '380',
        soldOut: false,
        discount: null,
        category: '演唱会',
        city: '北京'
    },
    {
        id: 11,
        title: '话剧《局外人》',
        image: 'https://dummyimage.com/200x280/FF1268/FFFFFF?text=Event+11',
        date: '2024-03-25 19:30',
        location: '南京·南京文化艺术中心',
        price: '198',
        soldOut: false,
        discount: null,
        category: '话剧歌剧',
        city: '南京'
    },
    {
        id: 12,
        title: '成都音乐嘉年华',
        image: 'https://dummyimage.com/200x280/FF1268/FFFFFF?text=Event+12',
        date: '2024-03-26 18:30',
        location: '成都·宽窄巷子广场',
        price: '128',
        soldOut: false,
        discount: null,
        category: '音乐节',
        city: '成都'
    }
])

// 筛选后的演出
const filteredEvents = computed(() => {
    let filtered = events.value

    // 按城市筛选
    if (selectedCity.value !== '全国') {
        filtered = filtered.filter(e => e.city === selectedCity.value)
    }

    // 按分类筛选
    if (selectedCategory.value !== '全部') {
        filtered = filtered.filter(e => e.category === selectedCategory.value)
    }

    return filtered
})

// 分页数据
const totalPages = computed(() => Math.ceil(filteredEvents.value.length / itemsPerPage))

const paginatedEvents = computed(() => {
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
