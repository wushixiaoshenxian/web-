import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import * as ElementPlusIconsVue from "@element-plus/icons-vue";


// app.use(ElementPlus)
createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
//$env:NODE_OPTIONS="--openssl-legacy-provider"

