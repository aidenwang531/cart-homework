<template>
  <div class="easy-checkbox" @click.stop.prevent="emits('change')">
    <input type="checkbox" :checked="checked" />
    <label for="checkbox" />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["change"]);
defineProps({
  checked: { type: Boolean, required: true },
});
</script>

<style lang="scss" scoped>
@import "./checkbox.scss";
$checkbox-checked-color: #42b883;
.easy-checkbox {
  input[type="checkbox"] {
    &:checked {
      + label:before {
        background: $checkbox-checked-color;
      }
    }
  }
}
</style>
