export const routes = [
	{
		path: "/:id?",
		name: "home",
		component: () => import("@/pages/index.vue")
	}
];