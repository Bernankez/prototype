import { createApp } from "vue";
import App from "./App.vue";
import "./styles/global.css";
import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import { router } from "./router";

const app = createApp(App);
app.use(router);

app.mount("#app");
