<template>
  <div class="card-left" @click="$emit('click', event)">
    <img :src="event.image" :alt="event.name" />
    <div class="card-left-info">
      <h4 class="left-info-title">{{ event.name }}</h4>
      <p class="left-info-time">{{ event.time }} | {{ event.city }}</p>
      <span class="price">¥{{ event.price }} 起</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  event: Object
})
</script>

<style scoped>
.card-left img{
  display: inline-block;
  width: 270px;
  height: 360px;
  position: relative;
  overflow: hidden;
}

.card-left {
  flex: 1;
  cursor: pointer;
  position: relative
}

.card-left-info {
  width: 270px;
  height: 118px;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 17px 10px;
  background-color: rgba(0, 0, 0, .5);
}

.left-info-title{
  height: 45px;
  font-size: 16px;
  color: #fff;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.price {
  margin-top: 12px;
  font-size: 20px;
  color: #fff;
}
</style>
