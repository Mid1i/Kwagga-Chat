import { defineStore } from "pinia";
import { ref } from "vue";

import type { Theme } from "@/types/Theme";
import { getItem, setItem } from "@/helpers/localStorage";


export const useThemeStore = defineStore("theme", () => {
	const theme = ref<Theme>("light");

	const changeTheme = (newValue: Theme): void => {
		theme.value = newValue;
		setItem("theme", newValue);
		document.documentElement.setAttribute("data-theme", theme.value);
	};

	const detectTheme = (): void => {
		const storageTheme = getItem("theme");
		const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		changeTheme((storageTheme === "light" || storageTheme === "dark") ? storageTheme : preferredTheme);
	};


	return {
		theme,
		changeTheme,
		detectTheme
	};
});