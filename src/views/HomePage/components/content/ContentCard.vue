<template>
  <div class="content-card-wrap">
    <div class="content-card">
      <!-- 标题栏 -->
      <div class="content-card-header">
        <h3 class="header-title">{{ title }}</h3>
        <!--TOFIX:这里可以优化，与真实大麦网比较该处鼠标悬停的效果-->
        <router-link :to="viewAllLink" class="header-more">
          查看全部&gt;
        </router-link>
      </div>

      <!-- 内容区域 -->
      <div class="content-card-box">
        <!-- 左边大图演唱会卡片 -->
        <MainEventCard :event="mainEvent" @click="onMainClick" />

        <!-- 右边：直接遍历渲染 EventCard -->
        <div class="card-right">
          <EventCard
            v-for="(item, index) in subEvents"
            :key="index"
            :event="item"
            @event-click="onSubClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import EventCard from "./EventCard.vue";
import MainEventCard from "./MainEventCard.vue";

defineProps({
  title: String,
  viewAllLink: String,
  mainEvent: Object,
  subEvents: Array,
});

const emit = defineEmits(["main-click", "sub-click"]);

const onMainClick = (event) => {
  emit("main-click", event);
};

const onSubClick = (event) => {
  emit("sub-click", event);
};
</script>

<style scoped>
.content-card-wrap {
  width: 1200px;
  margin: 0 auto 30px auto;
  position: relative;
  font-size: 0;
}
.content-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  width: 1200px;
  margin-top: 15px;
  position: relative;
  transition: box-shadow 0.3s ease;
  border: 1px solid #ebebeb;
}

.content-card-box {
  display: flex;
  margin-top: 15px;
}

.content-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 40px;
  line-height: 40px;
}

.header-title {
  font-size: 24px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
  color: #111;
  width: 500px;
  height: 40px;
  overflow: hidden;
}

.header-more {
  font-size: 14px;
  color: #999;
  text-decoration: none;
}

.header-more:hover {
  color: #e60012;
}

.card-right {
  display: inline-block;
  width: 870px;
  margin-left: 20px;
  height: 360px;
  vertical-align: top;
  overflow: hidden;
}
</style>
