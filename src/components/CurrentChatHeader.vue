<script setup lang="ts">
	defineProps<{ 
		chatName: string;
		chatColor: string;
		isOnline: boolean;
	 }>();
</script>


<template>
	<header class="header">
		<div class="header__recepient">
			<span class="header__recepient-wrapper" :style="{ backgroundColor: chatColor }">{{ chatName[0] }}</span>
			<div class="header__recepient-content">
				<h6 class="header__recepient-name">{{ chatName }}</h6>
				<span :class="['header__recepient-online', { online: isOnline }]">{{ isOnline ? "online" : "был(а) недавно" }}</span>
			</div>
		</div>
		<div class="header__navigation">
			<button 
				class="header__navigation-button"
				aria-label="Поиск по сообщениям"
			>
				<svg class="header__navigation-icon">
					<use href="@/assets/navigation.svg#searchMessage"/>
				</svg>
			</button>
			<button 
				class="header__navigation-button"
				aria-label="Информация по чату"
			>
				<svg class="header__navigation-icon">
					<use href="@/assets/navigation.svg#chatData"/>
				</svg>
			</button>
			<button 
				class="header__navigation-button"
				aria-label="Настройки чата"
			>
				<svg class="header__navigation-icon">
					<use href="@/assets/navigation.svg#moreOptions"/>
				</svg>
			</button>
		</div>
	</header>
</template>


<style lang="scss" scoped>
	.header {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: 15px 40px;

		border-bottom: 1px solid $color-border-light;

		&__recepient {
			align-items: center;
			display: flex;
			gap: 10px;

			&-wrapper {
				@include avatar-base;
			}

			&-content {
				@include flex-column;
				gap: 5px;
			}

			&-name {
				@include typography(title);
			}

			&-online {
				@include typography(text);
				font-size: 12px;

				&.online {
					color: $color-accent;
				}
			}
		}

		&__navigation {
			display: flex;
			gap: 10px;

			&-button {
				@include button-round;
			}
		}
	}


	@media(hover: hover) {
		.header__navigation-button:hover {
			background: $color-active-button;
		}
	}
</style>