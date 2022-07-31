import { Component, createApp } from "vue";
export function useMountComponent(rootComponent: Component) {
  const app = createApp(rootComponent);
  const root = document.createElement("div");
  document.body.appendChild(root);
  return {
    instance: app.mount(root),
    unmount() {
      app.unmount();
      document.body.removeChild(root);
    },
  };
}
