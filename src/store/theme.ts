import { defineStore } from "pinia";
import { ref } from "vue";

import type { ThemeType } from "@/types/Theme";
import { getItem, setItem } from "@/helpers/localStorage";


export const useThemeStore = defineStore("theme", () => {
	const theme = ref<ThemeType>("light");

	const changeTheme = (newValue: ThemeType): void => {
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