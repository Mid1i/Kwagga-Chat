import { createRouter, createWebHistory } from "vue-router";


const routes = [{
	path: "/",
	component: () => import("@/views/Chats.vue")
}];


export const router = createRouter({
	history: createWebHistory(),
	routes
});
