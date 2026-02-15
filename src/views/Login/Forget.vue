<template>
  <div class="forget-wrap">
    <div class="forget-box">


      <!-- 提示条 -->
      <div class="tip-box">
        <span class="tip-icon">✔</span>
        请输入你需要找回登录密码的邮箱
      </div>

      <!-- 表单 -->
      <div class="form-item">
        <label>邮箱：</label>
        <input
          type="text"
          placeholder="请输入邮箱"
          v-model="username"
        />
      </div>

      <div class="form-item">
        <label>验证码：</label>
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="code"
        />
        <button class="code-btn">获取验证码</button>
      </div>

      <div class="form-item">
        <label>新密码：</label>
        <input
          type="password"
          placeholder="请输入新密码"
          v-model="password"
        />
      </div>


      <!-- 按钮 -->
      <div class="btn-box">
        <button class="next-btn" @click="handleSubmit">
          下一步
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const code = ref('')

const handleSubmit = () => {
  if (!username.value) {
    alert('请输入邮箱')
    return
  }
  if (!code.value) {
    alert('请输入验证码')
    return
  }

  alert('验证成功')
}
</script>

<style scoped>
.forget-wrap {
  width: 100%;
  padding: 60px 0;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
}

.forget-box {
  width: 600px;
  background: #fff;
  padding: 40px 60px;
  border-radius: 6px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 500;
}

.tip-box {
  display: flex;
  align-items: center;
  background: #fef6f6;
  border: 1px solid #ffccc7;
  padding: 10px 15px;
  font-size: 14px;
  margin-bottom: 25px;
}

.tip-icon {
  color: #ff1268;
  margin-right: 8px;
}

.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.form-item label {
  width: 80px;
  text-align: right;
  margin-right: 10px;
  font-size: 14px;
}

.form-item input {
  flex: 1;
  height: 36px;
  padding: 0 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}

.form-item input:focus {
  border-color: #ff1268;
}

.code-btn {
  margin-left: 10px;
  height: 36px;
  padding: 0 12px;
  background: #fff;
  border: 1px solid #ff1268;
  color: #ff1268;
  border-radius: 4px;
  cursor: pointer;
}

.code-btn:hover {
  background: #fff1f0;
}

.btn-box {
  text-align: center;
  margin-top: 30px;
}

.next-btn {
  width: 200px;
  height: 40px;
  background: #ff1268;    
  border: none;
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.next-btn:hover {
  background: #ff1268;
}
</style>
