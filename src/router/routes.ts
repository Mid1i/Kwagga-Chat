export const routes = [
	{
		path: "/:id?",
		name: "index",
		component: () => import("@/pages/index.vue")
	},
	{
		path: "/callback",
		name: "callback",
		component: () => import("@/pages/Callback.vue")
	},
	{
		path: "/welcome",
		name: "welcome",
		component: () => import("@/pages/Welcome.vue")
	}
];