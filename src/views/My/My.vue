<template>
	<div id="my">
		<el-row :gutter="20">
			<el-col :span="5">
				<div id="my-info-wrapper">
					<div id="my-bg">
						<img src="./images/test.jpeg" alt="">
					</div>
					<div id="my-info">
						<span>用户名</span><br>
						<span>用户id</span>
					</div>
				</div>
				<div id="my-nav">
					<router-link to="/my/shelf">我的书架</router-link><br>
					<router-link to="/my/finance">账务中心</router-link><br>
					<router-link to="/my/member">会员中心</router-link><br>
					<router-link to="/my/message">消息中心</router-link><br>
				</div>
			</el-col>
			<el-col :span="19">
				<div id="my-main">
					<router-view></router-view>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
</script>

<style>
	#my-info-wrapper, #my-nav{
		margin-top: 30px;
		background: lightpink;
		text-align: center;
	}
	#my-main{
		margin: 30px 0px 0px 30px;
		background: lightgrey;
		text-align: center;
	}
	#my-bg img{
		width: 100px;
		height: 100px;
	}
</style>
