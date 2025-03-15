import { ref } from "vue";


const useModal = () => {
	const isOpen = ref<boolean>(false);

	const toggleModal = () => {
		isOpen.value = !isOpen.value;
	};


	return { 
		isOpen, 
		toggleModal 
	}
};


export default useModal;