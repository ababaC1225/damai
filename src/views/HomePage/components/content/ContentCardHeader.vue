<template>
        <div class="content-card-header">
            <h3 class="header-title">{{ title }}</h3>
            <router-link :to="viewAllLink" class="header-more">
                查看全部&gt;
            </router-link>
 
        </div>

   
</template>

<script setup>
defineProps({
    title:{
        type:String ,
        required:true
        
    },
    viewAllLink:{
        type:String,
         default:'/'
    }
})
</script>


<style scoped>
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
</style>