<script setup>
import HomePage from './views/HomePage/index.vue';
import Layout from './components/Layout/Layout.vue';
</script>

<template>
  <!--使用Layout组件在根组件为所有页面提供统一的布局结构，包括Header、Footer等公共组件-->
  <!--TODO: Layout组件待优化，如引入Router-view实现路由管理-->
  <Layout>
    <HomePage />
  </Layout>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
