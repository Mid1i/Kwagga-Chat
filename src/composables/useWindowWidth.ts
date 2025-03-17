import { ref, computed, onMounted, onUnmounted } from "vue";


const useWindowWidth = () => {
	const windowWidth = ref<number>(window.innerWidth);

	const isBigScreen = computed<boolean>(() => windowWidth.value > 767);

	const updateWidth = () => {
		windowWidth.value = window.innerWidth;
	};


	onMounted(() => window.addEventListener("resize", updateWidth));
	onUnmounted(() => window.removeEventListener("resize", updateWidth));


	return {
		windowWidth,
		isBigScreen
	}
};

export default useWindowWidth;