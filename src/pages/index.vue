<script setup lang="ts">
	import { computed, onMounted } from "vue";
	import { useRouter } from "vue-router";
	import { storeToRefs } from "pinia";

	import type { IMenuItem } from "@/types";

	import Chat from "@/components/chat/Chat.vue";
	import ChatList from "@/components/chat/ChatList.vue";
	import PopupMenu from "@/components/chat/PopupMenu.vue";
	import SearchUser from "@/components/chat/SearchUser.vue";
	import CustomButton from "@/components/ui/CustomButton.vue";
	import CustomTransition from "@/components/ui/CustomTransition.vue";
	import Backdrop from "@/components/ui/Backdrop.vue";
	import Search from "@/components/ui/Search.vue";

	import useWindowWidth from "@/composables/useWindowWidth";
	import usePopup from "@/composables/usePopup";
	import { 
		useChats,
		useChat,
		useAuth,
	} from "@/store";

	
	const { currentChat } = storeToRefs(useChat());
	const { currentUser } = storeToRefs(useAuth());
	const { search } = storeToRefs(useChats());

	const { redirectToAccount } = useAuth();

	const { 
		loadChats, 
		onSearch, 
		clearSearch 
	} = useChats();


	const router = useRouter();

	const { isOpen: isNewChat, togglePopup: toggleNewChat } = usePopup();
	const { isOpen, togglePopup } = usePopup();
	const { isBigScreen } = useWindowWidth();

	const isChatOpen = computed<boolean>(() => isBigScreen.value || !!currentChat.value);
	const isMenuOpen = computed<boolean>(() => isBigScreen.value || !currentChat.value);


	const NAV_MENU_ITEMS: IMenuItem[] = [
		{
			icon: "favourites",
			text: "Избранное",
			onClick: () => router.push(`/${currentUser.value?.sub}`)
		},
		{
			icon: "account",
			text: "Аккаунт",
			onClick: redirectToAccount
		},
		{
			icon: "settings",
			text: "Настройки",
			onClick: () => router.push("/settings")
		}
	];

	
	onMounted(loadChats);
</script>


<template>
	<custom-transition>
		<aside v-if="isMenuOpen" class="container__side-nav side-nav">
			<header class="side-nav__header">
				<div class="side-nav__header-icon">
					<custom-transition transition-name="rotate">
							<template v-if="!isNewChat">
								<CustomButton
									@click="togglePopup"
									:is-active="isOpen"
									label="Открыть меню навигации"
									icon="burgerMenu"
								/>
							</template>
							<template v-else>
								<CustomButton
									@click="toggleNewChat"
									label="Вернуться назад"
									icon="goBack"
								/>
							</template>
					</custom-transition>
				</div>
				<h6 class="side-nav__header-title">{{ isNewChat ? "Поиск пользователей" : "Чаты"}}</h6>
				<CustomButton
					custom-class="mobile"
					label="Изменить порядок чатов"
					type="text"
					text="Изм."
				/>
				<Search
					v-model="search"
					@clear-search="clearSearch"
					@on-search="onSearch"
				/>
				<Backdrop
					@toggle-popup="togglePopup"
					:is-open
				>
					<PopupMenu 
						custom-class="side-nav__menu"
						label="Меню навигации"
						:items="NAV_MENU_ITEMS"
					/>
				</Backdrop>
			</header>
			<custom-transition>
				<div v-if="!isNewChat" class="side-nav__content">
					<ChatList/>
					<CustomButton
						@click="toggleNewChat"
						label="Начать новый чат"
						type="round-accent"
						icon="newChat"
					/>
				</div>
				<SearchUser v-else/>
			</custom-transition>
		</aside>
	</custom-transition>
	<custom-transition>
		<Chat v-if="isChatOpen"/>
	</custom-transition>
</template>


<style scoped lang="scss">
	.side-nav {
		position: relative;
		overflow: hidden;

		display: flex;
		flex-direction: column;
		max-width: 430px;
		height: 100%;
		width: 100%;

		transition: var(--transition-all);

		&__header {
			align-items: center;
			display: flex;
			flex-wrap: wrap;
			gap: 15px;
			padding: 0px 15px 10px;

			&-icon {
				position: relative;

				height: 24px;
				width: 24px;
			}

			&-title {
				@include title;
			}
		}

		&__content {
			flex: 1 1 auto;
		}

		:deep(.side__nav-menu) {
			left: 15px;
			top: 55px;
		}

		:deep(.button.round-accent) {
			position: absolute;
			bottom: -60px;
			right: 40px;
			z-index: var(--z-sticky-button);
		}

		&:focus-within :deep(.button.round-accent) {
			bottom: 30px;
		}
	}


	@media(hover: hover) {
		.side-nav:hover :deep(.button.round-accent) {
			bottom: 30px;
		}

		.side-nav__header-button:hover {
			color: var(--color-active-icon);
		}
	}

	@media(max-width: 1100px) {
		.side-nav {
			max-width: 235px;
		}
	}

	@media(max-width: 767px) {
		.side-nav {
			overflow: hidden;
			padding-top: 10px;
			max-width: 100%;

			:deep(.button.round-accent) {
				bottom: 20px;
				right: 20px;
			}

			&__header {
				justify-content: space-between;
				padding: 0px 15px 10px;
				gap: 20px;

				&-edit {
					@include text(true);
					display: block;
				}
			}

			:deep(.side__nav-menu) {
				top: 50px;
			}
		}
	}
</style>