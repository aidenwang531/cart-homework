<template>
  <teleport v-if="inserted" :to="teleportTarget" :disabled="disabled">
    <transition appear :name="CLASS_NAME" v-on="onTransitionEmit">
      <div
        v-show="show"
        ref="modalRef"
        role="dialog"
        :class="[
          CLASS_NAME,
          { [`${CLASS_NAME}-show`]: show },
          { [`${CLASS_NAME}-latest`]: latest },
        ]"
        :style="{ transitionDuration: transition }"
        v-bind="$attrs"
      >
        <div
          :class="`${CLASS_NAME}-content`"
          :style="{
            transitionDuration: transition,
            ...mergeOptions?.styleModalContent,
          }"
          @mousedown.self="onMouseDown"
          @mouseup="onMouseUp"
        >
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, inject, ref, toRefs, watch } from "vue";
import { PLUGIN_NAME, CLASS_NAME } from "./index";
import { useClose, useOrder } from "./hooks";

import type { IProvide } from "./index";

interface MergeOptions {
  transition: number | false;
  closeClick: boolean;
  closeKeyCode: number | false;
  styleModalContent: { [key: string]: unknown };
}

export default defineComponent({
  inheritAttrs: false,
  props: {
    close: {
      type: Function,
      default: () => undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: [
    "before-enter",
    "enter",
    "after-enter",
    "enter-cancelled",
    "before-leave",
    "leave",
    "after-leave",
    "leave-cancelled",
  ],
  setup(props, context) {
    const { teleportTarget } = inject(PLUGIN_NAME) as IProvide;
    const { close, disabled, options, modelValue } = toRefs(props);

    const inserted = ref(
      modelValue.value === undefined ? true : modelValue.value
    );
    const modalRef = ref(null);
    const show = ref(!disabled.value);

    const mergeOptions: MergeOptions = {
      transition: 300,
      closeClick: true,
      closeKeyCode: 27,
      styleModalContent: {},
      ...options.value,
    };

    watch(
      [() => modelValue.value, () => disabled.value],
      () => {
        const isShow = modelValue.value && !disabled.value;

        show.value = isShow;

        if (modelValue.value) {
          inserted.value = modelValue.value;
        }
      },
      { immediate: true }
    );

    const { latest } = useOrder({ modalRef, show });
    const { onMouseDown, onMouseUp } = useClose({
      close,
      closeClick: mergeOptions.closeClick,
    });

    const onTransitionEmit = {
      beforeEnter: () => context.emit("before-enter"),
      enter: () => context.emit("enter"),
      afterEnter: () => context.emit("after-enter"),
      enterCancelled: () => context.emit("enter-cancelled"),
      beforeLeave: () => context.emit("before-leave"),
      leave: () => context.emit("leave"),
      afterLeave: () => {
        context.emit("after-leave");
        if (modelValue.value === false) {
          inserted.value = false;
        }
      },
      leaveCancelled: () => context.emit("leave-cancelled"),
    };

    return {
      CLASS_NAME,
      inserted,
      latest,
      mergeOptions,
      modalRef,
      onMouseDown,
      onMouseUp,
      onTransitionEmit,
      show,
      teleportTarget,
      transition: mergeOptions.transition
        ? mergeOptions.transition / 1000 + "s"
        : undefined,
    };
  },
});
</script>

<style lang="scss">
.the-modal-leave-from,
.the-modal-enter-to {
  opacity: 1;
}

.the-modal-enter-from,
.the-modal-leave-to {
  opacity: 0;
}

.the-modal {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  position: fixed;
  overflow-y: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(#000, 0.8);
  text-align: left;

  &:not(.the-modal-latest) {
    background: none;
  }
}

.the-modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
}

.modal {
  width: 300px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
}
</style>
