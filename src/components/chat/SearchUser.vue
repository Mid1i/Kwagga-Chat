<script setup lang="ts">
	import { storeToRefs } from "pinia";

	import SearchUserItem from "@/components/chat/SearchUserItem.vue";
	import CustomLoader from "@/components/ui/CustomLoader.vue";

	import { useChats } from "@/store";


	const { results, searchStatus } = storeToRefs(useChats());
</script>


<template>
	<custom-loader
		:condition-loading="searchStatus === 'loading'"
		:condition-empty="searchStatus === 'success' && results?.length === 0"
		empty-text="Ничего не найдено"
	>
		<div class="container__results">
			<SearchUserItem
				v-for="result in results"
				:key="result.id"
				:="result"
			/>
		</div>
	</custom-loader>
</template>


<style scoped lang="scss">
	.container__results {
		@include scroll-content;
		@include flex-column;
		
		gap: 2px;
		padding: 0px 5px 10px;
	}


	@media(max-width: 767px) {
		.container__resuls {
			gap: 0px;
			padding: 5px 0px;
		}
	}
</style>