<template>
	<div id="app">
		<el-row  justify="center" type="flex">
			<el-col :span="18">
				<Header></Header>
				<div id="main">
					<router-view></router-view>
				</div>
				<LoginAndRegister></LoginAndRegister>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import Header from './components/Header/Header.vue';
	import LoginAndRegister from './components/LoginAndRegister/LoginAndRegister.vue';
	export default{
		name: 'App',
		components: {
			Header,
			LoginAndRegister
		}
	}
</script>

<style>
	#main{
		margin-top: 30px;
	}
</style>
