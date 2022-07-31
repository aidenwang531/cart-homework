<style>
.toast-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 10%;
  transform: translateY(-50%);
  margin: auto;
  max-width: 80%;
  z-index: 99999;
  transition: opacity 0.3s linear;
  display: flex;
  justify-content: center;
}
.toast {
  border-radius: 8px;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  font-size: 0.28rem;
  padding: 10px;
}

.toast-wrapper-enter-from,
.toast-wrapper-leave-to {
  opacity: 0;
}
</style>
<template>
  <transition name="toast-wrapper">
    <div class="toast-container" v-show="showToast">
      <span class="toast">
        {{ message }}
      </span>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: ["message"],
  data() {
    return {
      showToast: false,
    };
  },
});
</script>
