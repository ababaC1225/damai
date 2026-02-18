<template>
  <div v-if="visible" class="overlay" @click.self="close">
    <div class="modal">
      <div class="header">
        <span>修改密码</span>
        <span class="close" @click="close">×</span>
      </div>

      <div class="form-item">
        <label>原密码</label>
        <input
          type="password"
          v-model="form.oldPassword"
          placeholder="请输入原密码"
        />
      </div>

      <div class="form-item">
        <label>新密码</label>
        <input
          type="password"
          v-model="form.newPassword"
          placeholder="请输入新密码"
        />
      </div>

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
import { reactive, ref, watch, onMounted, onBeforeUnmount } from "vue"
import request from "@/untils/request"

const props = defineProps({
  visible: Boolean
})

const emit = defineEmits(["update:visible", "success"])

const loading = ref(false)

const form = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
})

/* 关闭弹窗 */
const close = () => {
  emit("update:visible", false)
  reset()
}

/* 清空表单 */
const reset = () => {
  form.oldPassword = ""
  form.newPassword = ""
  form.confirmPassword = ""
}

/* 提交逻辑 */
const submit = async () => {
  if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
    alert("请填写完整信息")
    return
  }

  if (form.newPassword !== form.confirmPassword) {
    alert("两次输入密码不一样，请重新输入")
    form.newPassword = ""
    form.confirmPassword = ""
    return
  }

  if (loading.value) return
  loading.value = true

  try {
    const res = await request.put("/api/user/password", {
      oldPassword: form.oldPassword,
      newPassword: form.newPassword
    })

    if (res.code === 200) {
      alert("密码修改成功")
      emit("success")
      close()
    } else {
      alert(res.message || "修改失败")
    }
  } catch (err) {
    alert(err.response?.data?.message || "服务器错误")
  } finally {
    loading.value = false
  }
}

/* ESC 关闭 */
const handleKey = (e) => {
  if (e.key === "Escape") close()
}

onMounted(() => window.addEventListener("keydown", handleKey))
onBeforeUnmount(() =>
  window.removeEventListener("keydown", handleKey)
)
</script>

<style scoped>
/* 背景遮罩 */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

/* 小圆角框 */
.modal {
  width: 360px;
  background: #fff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  animation: pop 0.2s ease;
}

/* 标题 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 18px;
}

/* 关闭按钮 */
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

/* 输入框 */
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

/* 按钮区域 */
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

/* 动画 */
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
