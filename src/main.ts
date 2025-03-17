import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "@/App.vue";

import router from "@/router";
import { useAuth } from "@/store";



const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

const { init } = useAuth();

init().then(() => {
	app.use(router);
	app.mount('#app');
});
