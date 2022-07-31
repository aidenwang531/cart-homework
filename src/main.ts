import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import toast from "./common/plugins/toast";
import "./assets/main.css";
import VueUniversalModal from "./common/plugins/modal";
const app = createApp(App);

app.use(router);
app.use(toast);
app.use(VueUniversalModal, {
  teleportTarget: "#modals",
});
app.mount("#app");
