<script setup lang="ts">
	import type { IMenuItem } from "@/types";

	import CustomButton from "@/components/ui/CustomButton.vue";


	defineProps<{ 
		customClass?: string;
		customStyle?: Record<string, string>;
		label: string;
		items: IMenuItem[]; 
	}>();
</script>


<template>
	<nav 
		:class="['menu', customClass]" 
		:style="{ ...customStyle }"
		:aria-label="label"
	>
		<CustomButton
			v-for="item in items"
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


	@media(max-width: 767px) {
		.menu {
			top: 50px;
		}
	}
</style>