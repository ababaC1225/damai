<template>
  <div v-if="visible" class="overlay" @click.self="close">
    <div class="modal">
      <div class="header">
        <span>修改密码</span>
        <span class="close" @click="close">×</span>
      </div>

      <!-- 邮箱 -->
      <div class="form-item">
        <label>邮箱</label>
        <input
          type="text"
          v-model="form.email"
          placeholder="请输入邮箱"
        />
      </div>

      <!-- 验证码 -->
      <div class="form-item">
        <label>验证码</label>
        <div class="code-box">
          <input
            type="text"
            v-model="form.code"
            placeholder="请输入验证码"
          />
          <button
            type="button"
            class="code-btn"
            :disabled="countdown > 0"
            @click="sendCode"
          >
            {{ countdown > 0 ? countdown + "s" : "获取验证码" }}
          </button>
        </div>
      </div>

      <!-- 新密码 -->
      <div class="form-item">
        <label>新密码</label>
        <input
          type="password"
          v-model="form.password"
          placeholder="请输入新密码"
        />
      </div>

      <!-- 确认密码 -->
      <div class="form-item">
        <label>再次输入新密码</label>
        <input
          type="password"
          v-model="form.confirmPassword"
          placeholder="请再次输入新密码"
        />
      </div>

      <div class="actions">
        <button
          class="btn-primary"
          :disabled="loading"
          @click="submit"
        >
          {{ loading ? "提交中..." : "确认修改" }}
        </button>
        <button class="btn-cancel" @click="close">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue"
import request from "@/untils/request"

const props = defineProps({
  visible: Boolean
})

const emit = defineEmits(["update:visible", "success"])

const loading = ref(false)
const countdown = ref(0)
let timer = null

const form = reactive({
  email: "",
  code: "",
  password: "",
  confirmPassword: ""
})

/* 关闭弹窗 */
const close = () => {
  emit("update:visible", false)
  reset()
}

/* 重置表单 */
const reset = () => {
  form.email = ""
  form.code = ""
  form.password = ""
  form.confirmPassword = ""
}

/* 强密码校验 */
const validatePassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
  return regex.test(password)
}

/* 发送验证码 */
const sendCode = async () => {
  if (!form.email) {
    alert("请输入邮箱")
    return
  }

  if (countdown.value > 0) return

  try {
    const res = await request.get(
      `/api/auth/login/${form.email}`
    )

    if (res.code === 200) {
      alert("验证码已发送")
      countdown.value = 60

      timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          clearInterval(timer)
          timer = null
        }
      }, 1000)
    } else {
      alert(res.message || "发送失败")
    }
  } catch (err) {
    alert("发送失败")
  }
}

/* 提交修改密码 */
const submit = async () => {
  if (!form.email || !form.code || !form.password || !form.confirmPassword) {
    alert("请填写完整信息")
    return
  }

  if (form.password !== form.confirmPassword) {
    alert("两次密码不一致")
    return
  }

  if (!validatePassword(form.password)) {
    alert("密码至少8位，包含大小写字母、数字和特殊字符")
    return
  }

  if (loading.value) return
  loading.value = true

  try {
    const res = await request.put(
      `/api/user/password?code=${form.code}&password=${form.confirmPassword}`
    )

    if (res.code === 200) {
      alert("修改密码成功，请重新登录")
      emit("success")
      close()
    } else {
      alert(res.message || "修改失败")
    }
  } catch (err) {
    alert("服务器错误")
  } finally {
    loading.value = false
  }
}

/* ESC 关闭 */
const handleKey = (e) => {
  if (e.key === "Escape") close()
}

onMounted(() =>
  window.addEventListener("keydown", handleKey)
)

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKey)
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  width: 360px;
  background: #fff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  animation: pop 0.2s ease;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 18px;
}

.close {
  cursor: pointer;
  font-size: 20px;
  color: #999;
  transition: 0.2s;
}

.close:hover {
  color: #ff1268;
  transform: rotate(90deg);
}

.form-item {
  margin-bottom: 14px;
}

.form-item label {
  font-size: 13px;
  color: #555;
  display: block;
  margin-bottom: 6px;
}

.form-item input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: 0.2s;
}

.form-item input:focus {
  outline: none;
  border-color: #ff1268;
  box-shadow: 0 0 0 2px rgba(255, 18, 104, 0.15);
}

.code-box {
  display: flex;
  gap: 8px;
}

.code-box input {
  flex: 1;
}

.code-btn {
  white-space: nowrap;
  padding: 0 12px;
  border: none;
  background: #ff1268;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
}

.code-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 18px;
}

.btn-primary {
  background: linear-gradient(135deg, #ff1268, #ff4d8a);
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(255, 18, 104, 0.25);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancel {
  background: #f3f4f6;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

@keyframes pop {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
