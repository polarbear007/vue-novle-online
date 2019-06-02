<template>
	<div id="header-nav">
		<el-row>
			<el-menu mode="horizontal" router>
				<el-submenu index="1">
					<template v-slot:title>
						<router-link :to="{path: '/all', query:{currentPage: 1, pageSize: 10, category: 0}}" tag='span'>全部分类</router-link>
					</template>
					<el-menu-item index="1-1" :route="{path: '/all', query:{currentPage: 1, pageSize: 10, category: 1}}">现代言情</el-menu-item>
					<el-menu-item index="1-2" :route="{path: '/all', query:{currentPage: 1, pageSize: 10, category: 2}}">古代言情</el-menu-item>
					<el-menu-item index="1-3" :route="{path: '/all', query:{currentPage: 1, pageSize: 10, category: 3}}">浪漫青春</el-menu-item>
					<el-menu-item index="1-4" :route="{path: '/all', query:{currentPage: 1, pageSize: 10, category: 4}}">玄幻言情</el-menu-item>
					<el-menu-item index="1-5" :route="{path: '/all', query:{currentPage: 1, pageSize: 10, category: 5}}">仙侠奇缘</el-menu-item>
					<el-menu-item index="1-6" :route="{path: '/all', query:{currentPage: 1, pageSize: 10, category: 6}}">悬疑灵异</el-menu-item>
					<el-menu-item index="1-7" :route="{path: '/all', query:{currentPage: 1, pageSize: 10, category: 7}}">科幻空间</el-menu-item>
					<el-menu-item index="1-8" :route="{path: '/all', query:{currentPage: 1, pageSize: 10, category: 8}}">游戏竞技</el-menu-item>
					<el-menu-item index="1-9" :route="{path: '/all', query:{currentPage: 1, pageSize: 10, category: 9}}">短篇小说</el-menu-item>
					<el-menu-item index="1-10" :route="{path: '/all', query:{currentPage: 1, pageSize: 10, category: 10}}">N次元</el-menu-item>
				</el-submenu>
				
				<el-menu-item index="2" :route="{path: '/rank'}">排行榜</el-menu-item>
				<el-menu-item index="3" :route="{path: '/free', query:{isFree: 2}}">免费</el-menu-item>
				<el-menu-item index="4" :route="{path: '/finish', query: {state: 2}}">完本</el-menu-item>
				<el-menu-item index="5">现言青春</el-menu-item>
				<el-menu-item index="6">古言玄幻</el-menu-item>
				<el-menu-item index="7">神秘幻想</el-menu-item>
				
				<el-menu-item style="float: right;" index="9">作家专区</el-menu-item>
				<el-menu-item style="float: right;" index="8">充值</el-menu-item>
			</el-menu>
		</el-row>
	</div>
</template>

<script>
	export default{
		name: 'HeaderNav',
	}
</script>

<style>
	
</style>
