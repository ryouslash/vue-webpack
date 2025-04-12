import { createApp } from "vue";
import App from "./App.vue";

document.addEventListener("DOMContentLoaded", () => {
  const tocApp = document.getElementById("app");
  if (tocApp) {
    createApp(App).mount(tocApp);
  }
});
