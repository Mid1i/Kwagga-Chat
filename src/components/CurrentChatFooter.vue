<script setup lang="ts">
	import { ref } from "vue";


	const emit = defineEmits<{ inputMessage: [ text: string ] }>();

	const unsentMessage = ref<string>("");

	const updateMessage = (event: Event) => {
		const element = event.target as HTMLInputElement;
		unsentMessage.value = element.textContent ?? "";
		
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
				class="footer__button"
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
		z-index: $layer-sticky-z-index;

		padding: 0px 40px 10px;
		width: 100%;

		&__container {
			overflow: hidden;

			align-items: flex-end;
			display: flex;
			justify-content: space-between;

			background: $color-message-input;
			border: 1px solid $color-border-dark;
			border-radius: 10px;
		}

		&__button {
			@include button-base;
			flex: 0 0 auto;
			padding: 10px;
			height: 50px;
			width: 50px;

			&.hidden {
				display: none;
			}

			&.accent {
				color: $color-accent;
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

				@include typography(text);
				
				transform: translateY(-50%);
				pointer-events: none;
				opacity: 1;

				&.hidden {
					opacity: 0;
				}
			}

			&-input {
				overflow-y: auto;
				min-height: 50px;
				padding: 15px 0px;
				width: 100%;

				@include typography(text, false, true);
			}
		}
	}


	@media(hover: hover) {
		.footer__button:hover {
			color: $color-active-icon;
		}
	}
</style>