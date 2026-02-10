<template>
  <div class="card-right">
    <div
      class="card-item"
      v-for="(item, index) in events"
      :key="index"
      @click="$emit('event-click', item)"
    >
      <img :src="item.image" />
      <div class="card-item-info">
        <div class="title">{{ item.name }}</div>
        <div class="location">{{ item.location }}</div>
        <div class="time">{{ item.time }}</div>
        <div class="time"></div>
        <div class="price">¥{{ item.price }}
          <span>起</span>
        </div>

      </div>
      
    </div>
  </div>
</template>

<script setup>
defineProps({
  events: Array
})
</script>

<style scoped>
.card-right {
  display: inline-block;
  width: 870px;
  margin-left: 20px;
  height: 360px;
  vertical-align: top;
  overflow: hidden;
}
.card-item{
  width: 273px;
  height: 160px;
  display: block;
  margin-right: 16px;
  display: inline-block;
  margin-bottom: 40px;
  color: #000;
  overflow: hidden;
}

.card-item img {
  width: 118px;
  height: 158px;
  overflow: hidden;
  position: relative;
  display: inline-block;
  border: 1px solid #efefef;
}

.card-item-info{
  width: 140px;
  height: 100%;
  position: relative;
  padding-left: 15px;
  display: inline-block;
  vertical-align: top;
}

.card-item-info .title {
  line-height: 20px;
  font-size: 14px;
  color: #4A4A4A;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.card-item-info .location,
.card-item-info .time
{
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 12px;
    margin-top: 14px;
    color: #9B9B9B;
    overflow: hidden;
    word-break: break-all;
}

.card-item-info .time{
    margin-top: 7px;
}
.card-item-info .price {
    width: 138px;
    position: absolute;
    left: 15px;
    bottom: 0;
    font-size: 16px;
    color: #FF1268;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
