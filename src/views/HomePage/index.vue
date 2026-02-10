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
        />

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavMenu from './components/NavMenu.vue';
import Header from '../../components/Header/Header.vue';
import Footer from '../../components/Footer/Footer.vue';
import ContentCard from './components/content/ContentCard.vue';
import Banner from './components/Banner.vue';
import { getEventList } from '@/apis/event';

// 内容卡片列表
const contentCards = ref([]);

// 调用 api 获取数据
onMounted(async () => {
  contentCards.value = await getEventList();
});
</script>
