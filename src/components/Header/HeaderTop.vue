<template>
	<div id="header-top">
		<el-row>
			<el-col :span="8">
				<div id="logo">
					<router-link to="/">
						<img src="./images/logo.png" alt="首页" />
					</router-link>
				</div>
			</el-col>
			<el-col :span="8">
				<div id="search">
					<el-input placeholder="请输入搜索内容" v-model="keyword">
						 <template slot="append">
							<el-button class="el-icon-search" @click="search">搜索</el-button>
						 </template>
					</el-input>
				</div>
			</el-col>
			<el-col :span="8">
				<div id="user-info">
					<router-link class="user-info-link" to="/my">
						<span class="el-icon-s-custom"></span>
					</router-link>
					<router-link class="user-info-link" to="/my/message">
						<span class="el-icon-message">我的消息</span>
					</router-link>
					<router-link class="user-info-link" to="/my/shelf">
						<span class="el-icon-notebook-1">我的书架</span>
					</router-link>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name: 'HeaderTop',
	data(){
		return {
			keyword: ''
		}
	},
	methods: {
		search(){
			if(this.keyword.trim() !== ''){
				this.$router.push(`/search/${this.keyword.trim()}`);
			}
			this.keyword = '';
		}
	},
};
</script>

<style>
	.user-info-link{
		float: right;
		margin-left: 20px;
		line-height: 42px;
	}
	#header-top{
		margin-top: 20px;
	}
</style>
