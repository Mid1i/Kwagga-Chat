import { defineStore } from "pinia";
import { ref } from "vue";

import type { User } from "@/interfaces/User";
import { USER_1 } from "@/test";



export const useUserStore = defineStore("user", () => {
	const user = ref<User>(USER_1);


	return {
		user
	};
});