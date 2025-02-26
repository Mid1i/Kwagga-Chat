import { createApp } from "vue";
import { createPinia } from "pinia";

import { router } from "@/router";
import App from "@/App.vue";

import "@/assets/styles/base.scss";


const Vue = createApp(App);
const Pinia = createPinia();

Vue.use(Pinia);
Vue.use(router);
Vue.mount('#app');
