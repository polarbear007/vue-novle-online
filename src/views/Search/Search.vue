<template>
	<div id="search-result">
		搜索结果页面
	</div>
</template>

<script>
	import {Loading} from 'element-ui';
	export default{
		name: 'Search',
		data(){
			return {}
		},
		mounted(){
			this.searchByKeyWord(this.$route.params.keyword);
		},
		watch: {
			$route(newRoute) {
				this.searchByKeyWord(newRoute.params.keyword);
			}
		},
		methods: {
			searchByKeyWord(keyword) {
				let loading = Loading.service({
					target: '#search-result'
				});
				setTimeout(()=>{
					console.log('使用 ' + keyword + ' 进行搜索');
					loading.close();
				}, 2000);
			}
		},
	}
</script>

<style>
</style>
