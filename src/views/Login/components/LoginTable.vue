<template>
    <div class="login-container">
        <div class="login-card">
            <div class="login-tabs">
                <span :class="{active: currentLoginType === 'password'}"
                      @click="currentLoginType = 'password'">
                     密码登录
                </span>
                <span :class="{active: currentLoginType === 'sms'}"
                      @click="currentLoginType = 'sms'">
                      邮箱登录
                </span>
                <span :class="{active: currentLoginType === 'qr'}"
                      @click="currentLoginType = 'qr'">
                      二维码登录
                </span>
            </div>

        <!-- 登录内容区域 -->
             <div class="login-box">

            <!-- 密码登录 -->
                <div v-if="currentLoginType === 'password'">
                    <input type="text" placeholder="请输入手机号或邮箱" v-model="username">
                    <input type="password" placeholder="请输入密码" v-model="password">
                    <button @click="handlePasswordLogin">登录</button>
                    <div class="login-links">
                        <router-link to="/register">免费注册</router-link>
                        <router-link to="/forget">忘记密码</router-link>
                    </div>
                </div>

            <!-- 邮箱登录 -->
                <div v-else-if="currentLoginType === 'sms'">
                    <input type="text" placeholder="请输入邮箱" v-model="email">    
                    <input type="text" placeholder="请输入验证码" v-model="code">
                    <button @click="sendCode">获取验证码</button>
                </div>

            <!-- 二维码登录 -->
                <div v-else>
                    <img src="//img.alicdn.com/tfs/TB1qv3jxGmWBuNjy1XaXXXCbXXa-34-36.png" alt="二维码">
                    <p>请扫码登录</p>
                </div>

             </div>
        </div> 
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const currentLoginType = ref('password')

const username = ref('')
const password = ref('')
const code = ref('')
const email = ref('')

const handlePasswordLogin = async () => {
    if (!username.value || !password.value) {
        alert('请输入用户名和密码')
        return
    }
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })
        const data = await res.json()
        
        if (data.code === 200) {
            userStore.isLogin = true
            userStore.userInfo = data.data
            alert("登录成功")
            router.push('/')
        } else {
            alert(data.message)
        }
    } catch (error) {
        alert("登录失败")
    }
}

const sendCode = async () => {
    if (!email.value) {
        alert('请输入邮箱')
        return
    }
    try {
        const res = await fetch('/api/auth/sendCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value
            })
        })
        const data = await res.json()
        
        if (data.code === 200) {
            alert("验证码发送成功")
        } else {
            alert(data.message)
        }
    } catch (error) {
        alert("验证码发送失败")
    }
}
</script>


<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    
    margin-left: 80px;
}

.login-card {
    width: 350px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    overflow: hidden;
}

.login-tabs {
    display: flex;
    height: 50px;
    line-height: 50px;
    background-color: #e7e7e7;
    border-bottom: 1px solid #e7e7e7;
}

.login-tabs span {
    flex: 1;
    text-align: center;
    font-size: 16px;
    color: #666;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
}

.login-tabs span:hover {
    color: #ff1268;
}

.login-tabs span.active {
    color: #ff1268;
    font-weight: 500;
    background-color: #fff;
}

.login-tabs span.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 3px;
    background-color: #ff1268;
    border-radius: 2px;
}

.login-box {
    padding: 30px 25px;
}

.login-box input {
    width: 100%;
    height: 44px;
    padding: 0 15px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    transition: all 0.3s;
    outline: none;
    box-sizing: border-box;
}

.login-box input:focus {
    border-color: #ff1268;
    box-shadow: 0 0 0 2px rgba(255, 18, 104, 0.1);
}

.login-box input::placeholder {
    color: #999;
}

.login-box button {
    width: 100%;
    height: 44px;
    background: linear-gradient(135deg, #ff1268, #ff4d8a);
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 10px;
}

.login-box button:hover {
    background: linear-gradient(135deg, #e0105d, #ff3d7a);
    box-shadow: 0 4px 12px rgba(255, 18, 104, 0.3);
    transform: translateY(-1px);
}

.login-box button:active {
    transform: translateY(0);
}

.login-box img {
    display: block;
    margin: 20px auto;
    width: 150px;
    height: 150px;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    padding: 10px;
}

.login-box p {
    text-align: center;
    color: #666;
    font-size: 14px;
    margin: 0;
}

.login-links {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 15px;
}

.login-links a {
    color: #007bff;
    font-size: 14px;
    text-decoration: none;
}

.login-links a:hover {
    text-decoration: underline;
}
</style>
