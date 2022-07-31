<script setup lang="ts">
import {
  PLUGIN_NAME as TOAST_PLUGIN_NAME,
  TOAST,
} from "@/common/plugins/toast";
import { ref, computed, inject } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const userName = ref("");
const password = ref("");
const toast = inject<TOAST>(TOAST_PLUGIN_NAME);
function submit() {
  if (validateUserName() && validatePassword()) {
    toast && toast("登录成功");
    router.push("cart");
  }
}
const disableSubmit = computed<boolean>(() => {
  return !userName.value || !password.value;
});

function validateUserName(): boolean {
  const userNameValue = userName.value;
  const phoneNumberRegex = /^1[3456789]\d{9}$/;
  const emailRegex =
    /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
  if (
    !phoneNumberRegex.test(userNameValue) &&
    !emailRegex.test(userNameValue)
  ) {
    toast && toast("用户名格式错误，请重新输入");
    return false;
  }
  return true;
}

function validatePassword() {
  if (password.value.length < 6) {
    toast && toast("密码格式错误，请重新输入");
    return false;
  }
  return true;
}
</script>
<script lang="ts"></script>

<template>
  <div class="login-page">
    <div class="login-component">
      <div class="form-item">
        <label>用户名:</label>
        <input
          type="text"
          v-model.trim="userName"
          placeholder="请输入邮箱或者手机号码"
        />
      </div>
      <div class="form-item">
        <label>密码:</label>
        <input
          type="password"
          v-model.trim="password"
          placeholder="密码不少于6位"
        />
      </div>
      <div class="submit">
        <button @click="submit" :disabled="disableSubmit">提交</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-component {
  width: 600px;
  border: 1px solid #999;
  padding: 20px;
}
</style>
