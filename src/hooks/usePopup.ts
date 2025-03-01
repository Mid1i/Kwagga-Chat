import { ref } from "vue";


export const usePopup = () => {
	const isOpened = ref<boolean>(false);

	const togglePopup = () => {
		isOpened.value = !isOpened.value;
	};


	return {
		isOpened,
		togglePopup
	};
};