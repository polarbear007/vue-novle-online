<template>
	<div id="header">
		<HeaderTop></HeaderTop>
		<el-divider></el-divider>
		<HeaderNav></HeaderNav>
	</div>
</template>

<script>
	import HeaderTop from './HeaderTop.vue';
	import HeaderNav from './HeaderNav.vue';
	export default{
		name: 'Header',
		components: {
			HeaderTop,
			HeaderNav
		},
	}
</script>

<style>
	
</style>
