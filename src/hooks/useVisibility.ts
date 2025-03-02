import { ref } from "vue";


export const useVisibility = () => {
	const isVisible = ref<boolean>(false);

	const toggleVisibility = () => {
		isVisible.value = !isVisible.value;
	};


	return {
		isVisible,
		toggleVisibility
	};
};