<script setup lang="ts">
	const { sprite = "navigation.svg" } = defineProps<{
		customClass?: string;
		isRoundAccent?: boolean;
		isRound?: boolean;
		isBase?: boolean;
		text?: string;
		label: string;
		title?: string;
		sprite?: string;
		icon?: string;
	}>();


	const src = new URL(`/src/assets/${sprite}`, import.meta.url).href;
</script>


<template>
	<button 
		:class="[
			'button', 
			customClass,
			{ 'base': isBase },
			{ 'round': isRound },
			{ 'round-accent': isRoundAccent },
			{ 'text': text }
		]"
		:aria-label="label"
		:title="title ?? label"
	>
		<svg v-if="icon" class="button__icon">
			<use :href="`${src}#${icon}`"/>
		</svg>
		{{ text ?? "" }}
	</button>
</template>


<style lang="scss" scoped>
	.button {
		@include flex-center;
		flex: 0 0 auto;

		border-radius: 5px;
		@include focus-visible;

		transition: var(--transition-svg);

		&__icon {
			@include full-size;
			color: inherit;
		}

		&.base {
			height: 24px;
			width: 24px;

			color: var(--color-text-muted);
		}

		&.round {
			height: 40px;
			width: 40px;

			color: var(--color-text-main);

			background: var(--color-button);
			border-radius: 100%;

			& svg {
				height: 70%;
				width: 70%;
			}

			&-accent {
				height: 50px;
				width: 50px;

				background: var(--color-accent);
				border-radius: 100%;
				@include focus-visible(--color-text-main);

				& svg {
					height: 50%;
					width: 50%;
				}
			}
		}

		&.text {
			justify-content: flex-start;

			color: var(--color-text-main);
			font-weight: 400;
			font-size: 14px;

			& svg {
				height: 24px;
				width: 24px;
			}
		}
	}


	@media(hover: hover) {
		.button.base:hover {
			color: var(--color-active-icon);
		}

		.button.round:hover {
			background: var(--color-active-button);
		}

		.button.round-accent:hover {
			background: var(--color-active-accent);
		}
	}
</style>


