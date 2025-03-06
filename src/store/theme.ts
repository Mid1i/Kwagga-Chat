import { defineStore } from "pinia";
import { ref } from "vue";

import type { ThemeType } from "@/types/Theme";


export const useThemeStore = defineStore("theme", () => {
	const theme = ref<ThemeType>("light");

	const changeTheme = (newValue: ThemeType) => {
		theme.value = newValue;
		localStorage.setItem("theme", newValue);
		document.documentElement.setAttribute("data-theme", newValue);
	};

	const detectTheme = () => {
		const storageTheme = localStorage.getItem("theme");
		const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		changeTheme((storageTheme === "light" || storageTheme === "dark") ? storageTheme : preferredTheme);
	};


	return {
		theme,
		changeTheme,
		detectTheme
	}
});