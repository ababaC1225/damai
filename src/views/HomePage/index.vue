<template>
    <div>
        <Banner />
        <!--TOFIX:NavMenu组件样式有问题，需求为保持所有组件宽度相同，建议方案：1.手动为所有组件设置相同宽度 2.父容器设置左右padding，实现子组件同宽-->
        <NavMenu />
        <ContentCard
             v-for="item in contentCards"
            :key="item.id"
            :title="item.title"
            :viewAllLink="item.link"
            :mainEvent="item.mainEvent"
            :subEvents="item.subEvents"
            @main-click="onCardMainClick"
            @sub-click="onCardSubClick"
        />

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavMenu from './components/NavMenu.vue';
import ContentCard from './components/content/ContentCard.vue';
import Banner from './components/Banner.vue';
import { getEventList } from '@/apis/event';

const contentCards = ref([]);

onMounted(async () => {
    contentCards.value = await getEventList();
});

// 处理内容卡片内事件点击，跳转到演出详情页
function onCardMainClick(event) {
    if (!event) return
    const id = event.id || event.performanceId || event.id
    if (id) {
        // 跳转到详情页
        window.location.href = `/performance/${id}`
    }
}

function onCardSubClick(event) {
    onCardMainClick(event)
}
</script>
