import { ref } from "vue";


const usePopup = () => {
	const isOpen = ref<boolean>(false);

	const togglePopup = () => {
		isOpen.value = !isOpen.value;
	};


	return { 
		isOpen, 
		togglePopup 
	}
};


export default usePopup;