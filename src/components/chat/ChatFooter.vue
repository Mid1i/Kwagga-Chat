<script setup lang="ts">
	import { ref } from "vue";

	import CustomTransition from "@/components/ui/CustomTransition.vue";
	import CustomButton from "@/components/ui/CustomButton.vue";


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
			<CustomButton
				is-base
				label="Прикрепить файл"
				sprite="actions.svg"
				icon="attach"
			/>
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
			<CustomButton
				is-base
				custom-class="emodji"
				label="Отправить смайлик"
				sprite="actions.svg"
				icon="sendEmodji"
			/>
			<div class="footer__wrapper">
				<CustomTransition transition-name="scale-extra">
					<template v-if="!unsentMessage">
						<CustomButton
							is-base
							label="Отправить голосовое сообщение"
							sprite="actions.svg"
							icon="sendVoice"
						/>
					</template>
					<template v-else>
						<CustomButton
							is-base
							custom-class="accent"
							label="Отправить сообщение"
							sprite="actions.svg"
							icon="sendMessage"
						/>
					</template>
				</CustomTransition>
			</div>
		</div>
	</footer>
</template>


<style lang="scss" scoped>
	.footer {
		--size-button-message: 50px;

		z-index: 5px;

		flex: 1 1 auto;
		padding: 0px 40px 10px;
		width: 100%;

		&__container {
			overflow: hidden;

			align-items: flex-end;
			display: flex;
			justify-content: space-between;
			
			background: var(--color-message-input);
			border: 1px solid var(--color-border-dark);
			border-radius: 10px;
		}

		:deep(.button) {
			padding: 10px;
			height: var(--size-button-message);
			width: var(--size-button-message);

			&.accent {
				color: var(--color-accent);
			}
		}

		&__wrapper {
			position: relative;
			height:	var(--size-button-message);
			width: var(--size-button-message);
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
				padding: 15px 0px;
				width: 100%;
				
				color: var(--color-text-main);
				font-weight: 400;
				font-size: 14px;

				transition: var(--transition-all);

				&::-webkit-scrollbar {
					display: none;
				}
			}
		}
	}


	@media(max-width: 767px) {
		.footer {
			--size-button-message: 40px;

			padding: 0px 0px 10px;

			background: var(--color-message-input);

			&__container {
				background: transparent;
				border-radius: 0px;
			}

			:deep(.button) {
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