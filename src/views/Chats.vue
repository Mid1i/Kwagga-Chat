<script setup lang="ts">
	import ChatList from "@/components/ChatList.vue";
	import Search from "@/components/Search.vue";
</script>


<template>
	<div class="container">
		<aside class="chats">
			<Search/>
			<ChatList/>
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
		gap: 10px;

		padding: 10px 0px;

		width: 280px;
	}
</style>