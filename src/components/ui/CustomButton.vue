<script setup lang="ts">
	const { 
		sprite = "navigation.svg",
		type = "base" 
	} = defineProps<{
		type?: "round" | "base" | "text" | "round-accent" | "nav";
		customClass?: string;
		isActive?: boolean;
		isDelete?: boolean;
		text?: string;
		label?: string;
		sprite?: string;
		icon?: string;
	}>();


	const src = new URL(`/src/assets/${sprite}`, import.meta.url).href;
</script>


<template>
	<button 
		:class="[ 
			'button', 
			type, 
			customClass, 
			{ active: isActive },
			{ delete: isDelete }
		]"
		:aria-label="label"
		:title="label"
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
		@include focus-visible;
		
		flex: 0 0 auto;

		border-radius: 10px;

		transition: var(--transition-svg);

		&__icon {
			@include full-size;
			color: inherit;
		}

		&.base {
			height: 24px;
			width: 24px;

			color: var(--color-icon);

			&.active {
				background: var(--color-active-button);
			}
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

		&.text,
		&.nav {
			justify-content: flex-start;

			color: var(--color-text-main);
			font-weight: 400;
			font-size: 14px;

			& svg {
				height: 24px;
				width: 24px;
			}
		}

		&.nav {
			gap: 15px;
			padding: 5px 30px 5px 5px;

			font-weight: 500;

			border-radius: 8px;

			& svg {
				height: 20px;
				width: 20px;

				color: var(--color-icon);
			}
		}

		&.delete {
			color: var(--color-red);

			& svg {
				color: inherit;
			}
		}
	}


	@media(hover: hover) {
		.button.base:hover,
		.button.round:hover {
			background: var(--color-active-button);
		}

		.button.nav:hover {
			background: var(--color-active-nav-button);
		}

		.button.round-accent:hover {
			background: var(--color-active-accent);
		}
	}

	@media(max-width: 767px) {
		.button.base {
			height: 28px;
			width: 28px;
		}

		.button.round-accent {
			height: 60px;
			width: 60px;
		}

		.button.text svg,
		.button.nav svg {
			height: 28px;
			width: 28px;
		}

		.button.text,
		.button.nav {
			font-size: 16px;
		}

		.button.nav {
			gap: 20px;
		}
	}
</style>


