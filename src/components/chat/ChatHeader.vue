<script setup lang="ts">
	import type { ICurrentChat } from "@/types";

	import CustomButton from "@/components/ui/CustomButton.vue";
	import Avatar from "@/components/ui/Avatar.vue";


	const { recepient } = defineProps<ICurrentChat>();

	const { firstName, lastName, isOnline, username } = recepient;

	defineEmits<{ backToChats: [] }>();
</script>


<template>
	<header class="header">
		<div class="header__recepient">
			<CustomButton
				@click="$emit('backToChats')"
				custom-class="mobile"
				label="Назад к чатам"
				icon="closeChat"
				text="Назад"
			/>
			<Avatar
				:first-name
				:username
			/>
			<div class="header__recepient-content">
				<h6 class="header__recepient-name">{{ `${firstName} ${lastName}`  }}</h6>
				<span :class="['header__recepient-status', { online: isOnline }]">{{ isOnline ? "online" : "был(а) недавно" }}</span>
			</div>
		</div>
		<div class="header__navigation">
			<CustomButton
				is-round
				label="Поиск по сообщениям"
				icon="searchMessage"
			/>
			<CustomButton
				is-round
				label="Информация по чату"
				icon="chatData"
			/>
			<CustomButton
				is-round
				label="Настройки чата"
				icon="moreOptions"
			/>
		</div>
	</header>
</template>


<style lang="scss" scoped>
	.header {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: 15px 40px;

		border-bottom: 1px solid var(--color-border-light);

		&__recepient {
			align-items: center;
			display: flex;
			gap: 10px;

			&-content {
				@include flex-column;
				gap: 5px;
			}

			&-name {
				@include title;
			}

			&-status {
				@include text;
				font-size: 12px;

				&.online {
					color: var(--color-accent);
				}
			}
		}

		&__navigation {
			display: flex;
			gap: max(10px, 0.52vw);
		}
	}


	@media(hover: hover) {
		.header__navigation-button:hover {
			background: var(--color-active-button);
		}
	}

	@media(max-width: 767px) {
		.header {
			padding: 10px 15px;

			&__recepient {
				flex: 1 1 auto;
				justify-content: space-between;

				&-content {
					align-items: center;
					gap: 1px;
				}

				&-status {
					font-size: 11px;
				}
			}

			:deep(.avatar) {
				order: 3;
				height: 40px;
				width: 40px;
			}

			&__navigation {
				display: none;
			}
		}
	}
</style>