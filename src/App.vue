<script setup lang="ts">
	import { onBeforeMount } from "vue";
	import { RouterView } from "vue-router";
	import { useThemeStore } from "@/store/theme";


	const themeStore = useThemeStore();

	onBeforeMount(themeStore.detectTheme);
</script>


<template>
	<RouterView/>
</template>


<style scoped lang="scss"></style>
