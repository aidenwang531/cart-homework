import ToastConstructor from "./TheToast.vue";
import { nextTick, createVNode, App } from "vue";
import { useMountComponent } from "./useToast";
interface ToastOption {
  message: string;
  duration: number;
}
const PLUGIN_NAME = "TheToast";
type TOAST = (message: string) => void;
let isToastExist = false;
let unmountFn: () => void;
const toast = (options: ToastOption | string) => {
  const duration = typeof options !== "string" ? options.duration : 3000;
  if (isToastExist) {
    unmountFn();
    isToastExist = false;
  }
  const { instance, unmount } = useMountComponent(
    createVNode(ToastConstructor, {
      message: typeof options === "string" ? options : options.message,
    })
  );
  unmountFn = unmount;
  isToastExist = true;

  const { proxy, data } = instance.$;
  const RemoveSelf = function () {
    unmount();
    isToastExist = false;
  };

  nextTick(() => {
    data.showToast = true;
    proxy?.$el.removeEventListener("transitionend", RemoveSelf);
    duration &&
      setTimeout(function () {
        data.showToast = false;
        proxy?.$el.addEventListener("transitionend", RemoveSelf);
      }, duration);
  });
  return instance;
};

export default {
  install: (app: App) => {
    app.provide(PLUGIN_NAME, toast);
  },
};
export { PLUGIN_NAME };
export type { TOAST };
