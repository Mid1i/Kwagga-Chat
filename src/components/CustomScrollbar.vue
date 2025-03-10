<script setup lang="ts">
	import { onMounted, onUnmounted, ref, computed } from "vue";
	import { KEYBOARD_ACTIONS } from "@/constants";
	import { throttle } from "lodash";
	
	defineProps<{ 
		cssScrollbarWidth: string;
		cssBorderRadius: string;
	}>();

	const containerRef = ref<HTMLElement | null>(null);	
	const thumbRef = ref<HTMLElement | null>(null);
	const isDragging = ref<boolean>(false);

	let startY = 0;
	let startScrollTop = 0;

	// Вычисление процентов скролла для ARIA-атрибута `aria-scrollnow`
	const scrollPercentage = computed(() => {
		const container = containerRef.value;
		if (!container) return 0;
		return Math.round((container.scrollTop / (container.scrollHeight - container.clientHeight)) * 100);
	});

	// Обновление позиции ползунка скроллбара
	const updateThumbPosition = throttle(() => {
    if (!containerRef.value || !thumbRef.value) return;

		const { clientHeight, scrollHeight, scrollTop } = containerRef.value;
		if (scrollHeight <= clientHeight) {
			thumbRef.value.style.display = "none";
			return;
		};

		const thumbHeight = Math.max((clientHeight / scrollHeight) * clientHeight, 30);
		const thumbPosition = (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - thumbHeight);

		Object.assign(thumbRef.value.style, {
			height: `${thumbHeight}px`,
			top: `${thumbPosition}px`,
			display: "block"
		});
	}, 16);

	// Начало прокрутки с помощью мышки
	const startDragging = (event: MouseEvent | TouchEvent) => {
		if (!containerRef.value || !thumbRef.value) return;
		isDragging.value = true;
		
		startY = "touches" in event ? event.touches[0].clientY : event.clientY;
		startScrollTop = containerRef.value.scrollTop;
		document.body.style.userSelect = "none";
		event.preventDefault();
	};

	// Прокрутка с помощью мышки
	const onMove = (event: MouseEvent | TouchEvent) => {
		if (!isDragging.value || !containerRef.value || !thumbRef.value) return;

		const { clientHeight, scrollHeight } = containerRef.value;
		const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
		const deltaY = clientY - startY;
		const newScrollTop = startScrollTop + (deltaY / (clientHeight - thumbRef.value.clientHeight)) * (scrollHeight - clientHeight);

 	 	containerRef.value.scrollTop = Math.max(0, Math.min(newScrollTop, scrollHeight - clientHeight));
		updateThumbPosition();
	};

	// Конец прокрутки с помощью мышки
	const stopDragging = () => {
		isDragging.value = false;
		document.body.style.userSelect = "";
	};

	// Прокрутка с помощью клавиатуры
	const onKeyDown = (event: KeyboardEvent) => {
		if (!containerRef.value) return;
		KEYBOARD_ACTIONS[event.key](containerRef.value);
		updateThumbPosition();
	};


	onMounted(() => {
    if (!containerRef.value) return;

		containerRef.value.addEventListener("scroll", updateThumbPosition);
		containerRef.value.addEventListener("keydown", onKeyDown);
		containerRef.value.addEventListener("touchstart", startDragging, { passive: false });
		document.addEventListener("mousemove", onMove);
		document.addEventListener("mouseup", stopDragging);
		document.addEventListener("touchmove", onMove, { passive: false });
  	document.addEventListener("touchend", stopDragging);

		// Отслеживание изменений размера контейнера
  	new ResizeObserver(updateThumbPosition).observe(containerRef.value);
    updateThumbPosition();
  });

  onUnmounted(() => {
    if (!containerRef.value) return;

    containerRef.value.removeEventListener("scroll", updateThumbPosition);
    containerRef.value.removeEventListener("keydown", onKeyDown);
		containerRef.value.removeEventListener("touchstart", startDragging, { passive: false } as AddEventListenerOptions);
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", stopDragging);
		document.removeEventListener("touchmove", onMove, { passive: false } as AddEventListenerOptions);
  	document.removeEventListener("touchend", stopDragging);
  });
</script>


<template>
	<div class="wrapper">
		<div class="wrapper__scroll" ref="containerRef">
			<slot></slot>
		</div>
		<div 
			class="wrapper__scrollbar"
			:style="{ width: `${cssScrollbarWidth}px` }"
			role="scrollbar" 
      aria-orientation="vertical"
			:aria-valuenow="scrollPercentage"
			aria-valuemin="0"
      aria-valuemax="100"
		>
			<span 
				@mousedown="startDragging"
				@touchstart="startDragging"
				class="wrapper__scrollbar-thumb" 
				:style="{ borderRadius: `${cssBorderRadius}px` }"
				ref="thumbRef" 
			></span>
		</div>
	</div>
</template>


<style lang="scss" scoped>
	@use "@/assets/styles/variables.scss" as *;


	@mixin scrollbarActiveHover {
		background: var(--color-scrollbar-track);

		transform: scaleX(1.3);
		transform-origin: center;
	}

	.wrapper {
		position: relative;
		
		flex: 1 1 auto;
		overflow: hidden;

		&__scroll {
			overflow-y: overlay;
			height: 100%;

			&::-webkit-scrollbar {
				display: none;
			}
		}

		&__scrollbar {
			position: absolute;
			right: 5px;
			top: 0px;
			z-index: 5;
			
			height: 100%;
			
			background: transparent;
			border-radius: 5px;

			&-thumb {
				position: absolute;

				height: 50px;
				width: 100%;
				
				background: var(--color-scrollbar-thumb);
			}

			&:active {
				@include scrollbarActiveHover;
			}
		}
	}


	@media(hover: hover) {
		.wrapper__scrollbar:hover {
			@include scrollbarActiveHover;
		}
	}
</style>