<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import Layout from './components/Layout/Layout.vue';
import LoadLayout from './views/Login/LoadLayout.vue';

const route = useRoute();

const isLoginPage = computed(() => {
  return route.path === '/login' ||
    route.path === '/register' ||
    route.path === '/forget' ||
    route.path.startsWith('/user');
});
</script>

<template>
  <LoadLayout v-if="isLoginPage">
    <router-view />
  </LoadLayout>
  <Layout v-else>
    <router-view />
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
