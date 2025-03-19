import { ref, watch } from "vue";
import { debounce } from "lodash";

import useAPI from "@/composables/useAPI";


const useSearch = <T>(apiFunc: (params: string) => Promise<T>) => {
	const { data: results, status, fetchData } = useAPI<T, string>(apiFunc);

	const search = ref<string>("");


	const clearSearch = () => {
		const activeElement = document.activeElement as HTMLElement;
		if (activeElement) activeElement.blur();

		search.value = "";
	};

	const onSearch = () => {
		const query = search.value.trim();
		if (!query) return;

		console.log("Поиск пользователя с никнеймом: ", query);
		debounce(() => fetchData(query), 1000);
	};

	
	watch(search, onSearch);


	return { 
		results,
		status,
		search,
		onSearch, 
		clearSearch 
	}
};

export default useSearch;