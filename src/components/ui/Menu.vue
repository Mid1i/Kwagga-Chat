<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { useRouter } from "vue-router";

	import CustomButton from "@/components/ui/CustomButton.vue";

	import { KC_HOST } from "@/constants";
	import { useUser } from "@/store";


	const { currentUser } = storeToRefs(useUser());

	const router = useRouter();


	const navItems = [
		{
			icon: "favourites",
			text: "Избранное",
			onClick: () => {
				router.push(`/${currentUser.value.id}`);
			}
		},
		{
			icon: "account",
			text: "Аккаунт",
			onClick: () => {
				window.location.href = KC_HOST
			}
		},
		{
			icon: "settings",
			text: "Настройки",
			onClick: () => {
				router.push("/settings");
			}
		}
	];
</script>


<template>
	<nav class="menu" aria-label="Меню навигации">
		<CustomButton
			v-for="item in navItems"
			:key="item.icon"
			type="nav"
			:="item"
		/>
	</nav>
</template>


<style lang="scss" scoped>
	.menu {
		@include flex-column;
		@include popup;

		left: 15px;
		top: 55px;
	}
</style>