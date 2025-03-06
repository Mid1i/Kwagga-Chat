import { ref, onMounted, onUnmounted } from "vue";


// Прокрутка к определённому месту контейнера
export const useScrollToTop = (direction: "top" | "bottom", offset: number = 0) => {
	const containerRef = ref<HTMLElement | null>(null);
	const isScrolled = ref<boolean>(false);

	const scrollTo = (): void => {
		containerRef.value?.scrollTo({ [direction]: offset, behavior: "smooth" });
	};

	const updateScroll = (): void => {
		isScrolled.value = containerRef.value?.scrollTop !== 0;
	};

	onMounted(() => containerRef.value?.addEventListener("scroll", updateScroll));
	onUnmounted(() => containerRef.value?.removeEventListener("scroll", updateScroll));


	return {
		containerRef,
		isScrolled,
		scrollTo
	}
};