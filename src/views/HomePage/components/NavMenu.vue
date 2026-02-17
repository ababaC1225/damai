<template>
  <nav class="nav-menu">
    <router-link to="/search" class="menu-list">
      <div class="menu-list-icon">
        <img src="../../../assets/images/yanchanghui.png" alt="演唱会">
      </div>
      <span class="menu-list-name">演唱会</span>
    </router-link>
    <router-link to="/search" class="menu-list">
      <div class="menu-list-icon">
        <img src="../../../assets/images/huajv.png" alt="话剧歌剧">
      </div>
      <span class="menu-list-name">话剧歌剧</span>
    </router-link>
    <router-link to="/search" class="menu-list">
      <div class="menu-list-icon">
        <img src="../../../assets/images/tiyu.png" alt="体育">
      </div>
      <span class="menu-list-name">体育</span>
    </router-link>
    <router-link to="/search" class="menu-list">
      <div class="menu-list-icon">
        <img src="../../../assets/images/ertongqinzi.png" alt="儿童亲子">
      </div>
      <span class="menu-list-name">儿童亲子</span>
    </router-link>
    <router-link to="/search" class="menu-list">
      <div class="menu-list-icon">
        <img src="../../../assets/images/zhanlan.png" alt="展览休闲">
      </div>
      <span class="menu-list-name">展览休闲</span>
    </router-link>
    <router-link to="/search" class="menu-list">
      <div class="menu-list-icon">
        <img src="../../../assets/images/yinyuehui.png" alt="音乐会">
      </div>
      <span class="menu-list-name">音乐会</span>
    </router-link>
    <router-link to="/search" class="menu-list">
      <div class="menu-list-icon">
        <img src="../../../assets/images/qvyuan.png" alt="曲苑杂坛">
      </div>
      <span class="menu-list-name">曲苑杂坛</span>
    </router-link>
    <router-link to="/search" class="menu-list">
      <div class="menu-list-icon">
        <img src="../../../assets/images/wudao.png" alt="舞蹈芭蕾">
      </div>
      <span class="menu-list-name">舞蹈芭蕾</span>
    </router-link>
    <router-link to="/search" class="menu-list">
      <div class="menu-list-icon">
        <img src="../../../assets/images/erciyuan.png" alt="二次元">
      </div>
      <span class="menu-list-name">二次元</span>
    </router-link>
    <router-link to="/search" class="menu-list">
      <div class="menu-list-icon">
        <img src="../../../assets/images/lvyou.png" alt="旅游展览">
      </div>
      <span class="menu-list-name">旅游展览</span>
    </router-link>

  </nav>
</template>

<script setup>

</script>

<style scoped>
.nav-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #fff;
  border-radius: 8px;
  width: 1200px;
  margin: 15px auto;
  padding: 22px 0 25px 0;
  border: 1px solid #ebebeb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.menu-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  height: 69px;
}

.menu-list-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 36px;
  height: 48px;
  width: 48px;
  border-radius: 50%;
}

.menu-list-name {
  width: 120px;
  line-height: 21px;
  text-align: center;
  white-space: nowrap;
}

ul {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
}

li {
  font-size: 14px;
  cursor: pointer;
}
</style>