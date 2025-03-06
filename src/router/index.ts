import { createRouter, createWebHistory } from "vue-router";


const routes = [{
	path: "/",
	component: () => import("@/views/ChatDashboard.vue")
}];


export const router = createRouter({
	history: createWebHistory(),
	routes
});
