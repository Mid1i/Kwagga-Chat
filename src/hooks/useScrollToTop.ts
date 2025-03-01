import { ref, onMounted, onUnmounted } from "vue";


export const useScrollToTop = () => {
	const containerRef = ref<HTMLElement | null>(null);
	const isScrolled = ref<boolean>(false);

	const scrollToTop = (): void => {
		containerRef.value?.scrollTo({ top: 0, behavior: "smooth" });
	};

	const updateScroll = (): void => {
		isScrolled.value = containerRef.value?.scrollTop !== 0;
	};

	onMounted(() => containerRef.value?.addEventListener("scroll", updateScroll));
	onUnmounted(() => containerRef.value?.removeEventListener("scroll", updateScroll));


	return {
		containerRef,
		isScrolled,
		scrollToTop
	};
};