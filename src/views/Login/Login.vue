<template>
    <div class="login-main-wrap">
            <div class="login-main">
                <div class="login-main-photo">
                    <img src="https://img.alicdn.com/tfs/TB1NkOydrus3KVjSZKbXXXqkFXa-720-400.png_q75.jpg" alt="damai">
                </div>
                <LoginTable />

            </div>
 
    </div>
</template>

<script setup>
import LoginTable from './components/LoginTable.vue'


</script>



<style scoped>

.login-main-wrap {
    background: linear-gradient(to right, #17073d, #17073d, #17073d);
}

.login-main{
    margin: 0 auto;
    height: 600px;
    width: 1150px;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    padding-top: 90px;
}
.login-main-photo{
    width: 720px;
    height: 404px;
}





</style>