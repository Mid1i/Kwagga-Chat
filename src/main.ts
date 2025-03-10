import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "@/router";


const app = createApp(App);

/** Pinia **/
/** https://pinia.vuejs.org/ **/
const pinia = createPinia();
app.use(pinia);

/** Vue Router **/
/** https://router.vuejs.org/ **/
app.use(router);

app.mount('#app');
