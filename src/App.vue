<script setup lang="ts">
	import { RouterView } from "vue-router";

	import AppLayout from "@/layouts/AppLayout.vue";
</script>


<template>
	<app-layout>
		<RouterView/>
	</app-layout>
</template>


<style lang="scss">
	*.mobile {
		display: none !important;
	}


	@media(max-width: 767px) {
		*.mobile {
			display: flex !important;
		}
	}
</style>
