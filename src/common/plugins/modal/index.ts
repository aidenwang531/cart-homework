import { ref, readonly } from "vue";
import Modal from "./TheModal.vue";
import type { App, Ref } from "vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    Modal: typeof Modal;
  }
}

interface IPluginOptions {
  teleportTarget?: string;
  modalComponent?: string;
}
interface IProvide {
  teleportTarget: string;
  visibleModals: Ref<Set<HTMLElement>>;
  addVisibleModals: (el: HTMLElement) => void;
  removeVisibleModals: (el: HTMLElement) => void;
}

const PLUGIN_NAME = "TheModal";
const CLASS_NAME = "the-modal";

const install: (app: App, options: IPluginOptions) => void = (
  app,
  options = {}
) => {
  const { teleportTarget = "", modalComponent = "Modal" } =
    options as IPluginOptions;

  const visibleModals: IProvide["visibleModals"] = ref(new Set());
  const addVisibleModals: IProvide["addVisibleModals"] = (el) => {
    visibleModals.value.add(el);
  };
  const removeVisibleModals: IProvide["removeVisibleModals"] = (el) => {
    visibleModals.value.delete(el);
  };

  app.provide(PLUGIN_NAME, {
    teleportTarget,
    visibleModals: readonly(visibleModals),
    addVisibleModals,
    removeVisibleModals,
  });

  app.component(modalComponent, Modal);
};

export default {
  install,
};

export { PLUGIN_NAME, CLASS_NAME };
export type { IPluginOptions, IProvide };
