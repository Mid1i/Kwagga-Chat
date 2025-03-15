import { ref } from "vue";


const useSearch = () => {
	const searchValue = ref<string>("");

	const clearSearch = (): void => {
		const activeElement = document.activeElement as HTMLElement;
		if (activeElement) activeElement.blur();

		searchValue.value = "";
	};


	return { 
		searchValue, 
		clearSearch 
	}
};

export default useSearch;