<template>
    <div class="banner-wrapper">
        <el-carousel height="300px">
            <el-carousel-item v-for="item in images" :key="item">
                <img :src="item" class="banner-img" />
             </el-carousel-item>
         </el-carousel>
    </div>

</template>

<script setup>
import lunbo1 from '@/assets/images/lunbo1.jpg'
import lunbo2 from '@/assets/images/lunbo2.jpg'
import lunbo3 from '@/assets/images/lunbo3.jpg'

const images = [
  'https://gw.alicdn.com/tfs/TB1KiMMq7L0gK0jSZFtXXXQCXXa-1200-320.png',
  lunbo2,
  lunbo3
]
</script>

<style scoped>
.banner-wrapper {
  width: 1200px;        
  margin: 20px auto;  
  border-radius: 12px; 
  overflow: hidden; 
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
