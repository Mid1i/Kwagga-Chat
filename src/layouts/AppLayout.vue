<script setup lang="ts"></script>

<template>
	<div class="container">
		<slot></slot>
	</div>
</template>

<style lang="scss">
	.container {
		align-items: stretch;
		display: flex;
		@include full-size;
	}
</style>