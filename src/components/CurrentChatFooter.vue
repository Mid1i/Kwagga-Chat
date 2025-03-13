<script setup lang="ts">
	import { ref } from "vue";


	const emit = defineEmits<{ inputMessage: [ text: string ] }>();

	const unsentMessage = ref<string>("");

	const updateMessage = (event: Event) => {
		const element = event.target as HTMLInputElement;
		unsentMessage.value = element.textContent ?? "";

		element.style.maxHeight = `${element.scrollHeight}px`;
		
		emit('inputMessage', unsentMessage.value);
	};
</script>


<template>
	<footer class="footer">
		<div class="footer__container">
			<button 	
				class="footer__button"
				aria-label="Прикрепить файл"
			>
				<svg class="footer__button-icon">
					<use href="@/assets/actions.svg#attach"/>
				</svg>
			</button>
			<div class="footer__message">
				<span :class="['footer__message-placeholder', { hidden: !!unsentMessage }]" aria-hidden="true">Напишите сообщение...</span>
				<div 
					@input="updateMessage"
					class="footer__message-input"
					contenteditable
					role="textbox"
					aria-label="Напишите сообщение"
					aria-multiline="true"
				>
				</div>
			</div>
			<button 
				class="footer__button emodji"
				aria-label="Отправить смайлик"	
			>
				<svg class="footer__button-icon">
					<use href="@/assets/actions.svg#sendEmodji"/>
				</svg>
			</button>
			<button 
				:class="['footer__button', { hidden: unsentMessage }]"
				aria-label="Отправить голосовое сообщение"
			>
				<svg class="footer__button-icon">
					<use href="@/assets/actions.svg#sendVoice"/>
				</svg>
			</button>
			<button 
				:class="['footer__button accent', { hidden: !unsentMessage }]"
				aria-label="Отправить сообщение"	
			>
				<svg class="footer__button-icon">
					<use href="@/assets/actions.svg#sendMessage"/>
				</svg>
			</button>
		</div>
	</footer>
</template>


<style lang="scss" scoped>
	.footer {
		z-index: var(--layer-sticky-z-index);

		flex: 1 1 auto;
		padding: 0px max(40px, 2.04vw) max(10px, 0.52vw);
		width: 100%;

		&__container {
			overflow: hidden;

			align-items: flex-end;
			display: flex;
			justify-content: space-between;
			
			background: var(--color-message-input);
			border: max(1px, 0.05vw) solid var(--color-border-dark);
			border-radius: max(10px, 0.52vw);
		}

		&__button {
			@include button-base;
			flex: 0 0 auto;
			padding: max(10px, 0.52vw);
			height: var(--size-button-message);
			width: var(--size-button-message);

			&.hidden {
				display: none;
			}

			&.accent {
				color: var(--color-accent);
			}
		}

		&__message {
			position: relative;
			
			align-self: center;
			flex: 1 1 auto;
			height: 100%;
			width: 0px;

			&-placeholder {
				position: absolute;
				left: 0px;
				top: 50%;

				@include text;
				
				transform: translateY(-50%);
				pointer-events: none;
				opacity: 1;

				&.hidden {
					opacity: 0;
				}
			}

			&-input {
				overflow-y: auto;
				min-height: var(--size-button-message);
				padding: max(15px, 0.78vw) 0px;
				width: 100%;
				
				color: var(--color-text-main);
				font-weight: 400;
				font-size: 14px;

				transition: all var(--duration-transition-base) ease-in-out;

				&::-webkit-scrollbar {
					display: none;
				}
			}
		}
	}


	@media(hover: hover) {
		.footer__button:hover {
			color: var(--color-active-icon);
		}
	}

	@media(max-width: 767px) {
		.footer {
			--size-button-message: 40px;

			padding: 0px 0px 5px;

			background: var(--color-message-input);

			&__container {
				border-radius: 0px;
			}

			&__button {
				padding: 6px;

				&.emodji {
					display: none;
				}
			}

			&__message-input {
				padding: 10px 0px;
			}
		}
	}
</style>