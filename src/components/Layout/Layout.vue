<script setup>
import Header from '../Header/Header.vue';
import Footer from '../Footer/Footer.vue';
</script>

<template>
  <div class="layout">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>


