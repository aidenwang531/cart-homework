import { computed, inject, nextTick, watch } from "vue";
import { PLUGIN_NAME } from "./index";

import type { ComputedRef, Ref } from "vue";
import type { IProvide } from "./index";

type UseClose = ({
  close,
  closeClick,
}: {
  close: Ref;
  closeClick: boolean;
}) => {
  onMouseDown: (e: MouseEvent) => void;
  onMouseUp: (e: MouseEvent) => void;
};

type UseOrder = ({
  modalRef,
  show,
}: {
  modalRef: Ref<HTMLElement | null>;
  show: Ref<boolean>;
}) => {
  latest: ComputedRef<boolean>;
};

export const useClose: UseClose = ({ close, closeClick }) => {
  let actionTarget: null | EventTarget = null;

  function onMouseDown(e: MouseEvent) {
    actionTarget = e.target;
  }

  function onMouseUp(e: MouseEvent) {
    if (closeClick && actionTarget === e.target) {
      close.value();
    }
    actionTarget = null;
  }

  return {
    onMouseDown,
    onMouseUp,
  };
};

export const useOrder: UseOrder = ({ modalRef, show }) => {
  const { visibleModals, addVisibleModals, removeVisibleModals } = inject(
    PLUGIN_NAME
  ) as IProvide;

  const latest = computed(() => {
    const arr = [...visibleModals.value.values()];

    if (!arr.length || !modalRef.value) {
      return false;
    }

    return arr[arr.length - 1] === modalRef.value;
  });

  watch(
    () => show.value,
    () => {
      nextTick(() => {
        if (!modalRef.value) return;

        if (show.value) {
          addVisibleModals(modalRef.value);
        } else {
          removeVisibleModals(modalRef.value);
        }
      });
    },
    { immediate: true }
  );

  return {
    latest,
  };
};
