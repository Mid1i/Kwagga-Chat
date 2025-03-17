import { createRouter, createWebHistory } from "vue-router";
import { storeToRefs } from "pinia";

import { useAuth } from "@/store";
import { routes } from "./routes";


const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach((to, _, next) => {
	const { isAuthenticated } = storeToRefs(useAuth());

	const isWelcome = to.name === "welcome";
	const authenticated = isAuthenticated.value;

	if (isWelcome && authenticated) next({ name: "index" });

	(!isWelcome && to.name !== "callback" && !authenticated) ? next({ name: "welcome" }) : next();
});

export default router;
