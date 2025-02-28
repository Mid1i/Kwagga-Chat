<script setup lang="ts">
	import ProfileNavigation from "@/components/ProfileNavigation.vue";
	import ChatList from "@/components/ChatList.vue";
	import Search from "@/components/Search.vue";
</script>


<template>
	<div class="container">
		<aside class="chats">
			<Search/>
			<ChatList/>
			<ProfileNavigation/>
		</aside>
	</div>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;


	.container {
		align-items: stretch;
		display: flex;

		height: 100%;
		width: 100%;
	}

	.chats {
		background: var(--color-bg-secondary);
		box-shadow: var(--box-shadow);

		display: flex;
		flex-direction: column;

		padding-top: max(10px, 0.52vw);

		width: max(280px, 14.6vw);
	}
</style>