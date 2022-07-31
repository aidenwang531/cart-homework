<template>
  <div class="easy-checkbox" @click.stop.prevent="toggleChecked">
    <input type="checkbox" :checked="isChecked" :class="status" />
    <label for="checkbox" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const emits = defineEmits(["change"]);

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});

const isChecked = computed(() => props.status === "allSelected");

const toggleChecked = () => {
  emits("change", !isChecked.value);
};
</script>

<style lang="scss" scoped>
@import "./checkbox.scss";

$checkbox-checked-color: #42b883;

.easy-checkbox {
  input[type="checkbox"] {
    &.allSelected,
    &.partSelected {
      + label:before {
        background: $checkbox-checked-color;
      }
    }
  }
}
</style>
