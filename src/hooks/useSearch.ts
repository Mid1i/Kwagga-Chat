import { ref } from "vue";


export const useSearch = () => {
	const searchValue = ref<string>("");

	const clearSearch = (): void => {
		(document.activeElement as HTMLElement)?.blur();
		searchValue.value = "";
	};


	return {
		searchValue,
		clearSearch
	}
};