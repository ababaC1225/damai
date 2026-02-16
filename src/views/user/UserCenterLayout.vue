<template>
    <div class="user-center-page">
      <div class="red-line"></div>
      <div class="main">
        <aside class="sidenav">
          <div class="mydamai">
            <h3 class="sidenav-title">我的大麦</h3>
            <dl class="sidenav-list">
              <dt>交易中心</dt>
              <dd>
                <router-link to="/user/order" class="sidenav-link" :class="{ active: $route.path === '/user/order' }">
                  订单管理
                </router-link>
              </dd>
            </dl>
            <dl class="sidenav-list">
              <dt>账户中心</dt>
              <dd>
                <router-link to="/user/address" class="sidenav-link" :class="{ active: $route.path === '/user/address' }">
                  收货地址
                </router-link>
              </dd>
              <dd>
                <router-link to="/user/setting" class="sidenav-link" :class="{ active: $route.path === '/user/setting' }">
                  账号设置
                </router-link>
              </dd>
              <dd>
                <router-link to="/user/info" class="sidenav-link" :class="{ active: $route.path === '/user/info' }">
                  个人信息
                </router-link>
              </dd>
              <dd>
                <router-link to="/user/contacts" class="sidenav-link" :class="{ active: $route.path === '/user/contacts' }">
                  常用购票人
                </router-link>
              </dd>
            </dl>
          </div>
        </aside>
        <div class="content">
          <slot />
        </div>
      </div>
    </div>
  </template>
  
  <script setup></script>
  
  <style scoped>
  .user-center-page {
    min-height: 100vh;
    background: #f5f5f5;
    padding-bottom: 40px;
  }
  
  .red-line {
    height: 5px;
    background: #ed0a75;
  }
  
  .main {
    width: 1200px;
    margin: 0 auto;
    padding: 24px 0;
    display: flex;
    gap: 24px;
  }
  
  .sidenav {
    flex-shrink: 0;
    width: 200px;
  }
  
  .mydamai {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .sidenav-title {
    margin: 0;
    padding: 18px 20px;
    font-size: 17px;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #ff1268, #ed0a75);
    border-radius: 4px 4px 0 0;
    letter-spacing: 0.5px;
  }
  
  .sidenav-list {
    margin: 0;
    padding: 0;
  }
  
  .sidenav-list dt {
    margin: 0;
    padding: 14px 20px 10px;
    font-size: 13px;
    font-weight: 600;
    color: #333;
    border-left: 3px solid #ff1268;
    background: linear-gradient(90deg, #fff5f8 0%, transparent 100%);
    margin-top: 2px;
  }
  
  .sidenav-list dd {
    margin: 0;
    padding: 0;
  }
  
  .sidenav-link {
    display: block;
    padding: 10px 20px;
    font-size: 14px;
    color: #333;
    text-decoration: none;
    transition: background 0.2s, color 0.2s;
  }
  
  .sidenav-link:hover {
    background: #fff5f8;
    color: #ff1268;
  }
  
  .sidenav-link.active {
    background: #fff5f8;
    color: #ff1268;
    font-weight: 500;
  }
  
  .content {
    flex: 1;
    min-width: 0;
  }
  </style>
  