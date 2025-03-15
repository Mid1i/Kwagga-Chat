<script setup lang="ts"></script>

<template>
	<div class="container">
		<slot></slot>
	</div>
</template>

<style lang="scss">
	.container {
		position: relative;
		
		align-items: stretch;
		display: flex;
		padding-top: max(20px, 1.04vw);
		@include full-size;
	}


	@media(max-width: 767px) {
		.container {
			padding-top: 0px;
		}
	}
</style>