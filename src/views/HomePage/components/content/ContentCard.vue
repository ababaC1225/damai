<template>
    <div class="content-card-wrap">

        <div class="content-card">
        <!-- 标题栏 -->
        <ContentCardHeader
            :title="title"
            :viewAllLink="viewAllLink"
        />


        <!-- 内容区域 -->
         <div class="content-card-box">
            <!-- 左边 -->
            <ContentCardLeft
                :event="mainEvent"
                @click="onMainClick"
            />

            <!-- 右边 -->
            <ContentCardRight
                :events="subEvents"
                @event-click="onSubClick"
            />

         </div>


        </div>

    </div>
    
    
</template>

<script setup>
import ContentCardHeader from './ContentCardHeader.vue';
import ContentCardLeft from './ContentCardLeft.vue';
import ContentCardRight from './ContentCardRight.vue';

defineProps({
    title:String,
    viewAllLink:String,
    mainEvent:Object,
    subEvents:Array
})

const emit = defineEmits(['main-click','sub-click'])

const onMainClick =(event) =>{
    emit('main-click',event)
}

const onSubClick=(payload)=>{
    emit('sub-click',payload)
}




</script>

<style scoped>
.content-card-wrap{
    width: 1200px;
    margin: 0 auto 30px auto;
    position: relative;
    font-size: 0;
}
.content-card{
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

.content-card-box{
    display: flex;
    margin-top: 15px;

}
</style>

