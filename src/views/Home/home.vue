<template>
	<div id="home">
		<div id="focus-wrapper">
			<el-row :gutter="20">
				<el-col :span="20">
					<div id="focus-slider">
						<el-carousel height="300px">
							<el-carousel-item >
								<router-link to="/">
									<img src="./images/slider1.jpg" width="100%" height="auto">
								</router-link>
							</el-carousel-item>
							<el-carousel-item >
								<router-link to="/">
									<img src="./images/slider2.jpg" width="100%" height="auto">
								</router-link>
							</el-carousel-item>
							<el-carousel-item >
								<router-link to="/">
									<img src="./images/slider3.jpg" width="100%" height="auto">
								</router-link>
							</el-carousel-item>
							<el-carousel-item >
								<router-link to="/">
									<img src="./images/slider4.jpg" width="100%" height="auto">
								</router-link>
							</el-carousel-item>
							<el-carousel-item >
								<router-link to="/">
									<img src="./images/slider5.jpg" width="100%" height="auto">
								</router-link>
							</el-carousel-item>
						</el-carousel>
					</div>
				</el-col>
				<el-col :span="4">
					<div id="focus-notice">
						<h3>公告</h3>
						<el-divider></el-divider>
						<ul>
							<li>
								<a href="#">[公告1]</a>
							</li>
							<li>
								<a href="#">[公告2]</a>
							</li>
							<li>
								<a href="#">[公告3]</a>
							</li>
							<li>
								<a href="#">[公告4]</a>
							</li>
							<li>
								<a href="#">[公告5]</a>
							</li>
						</ul>
					</div>
				</el-col>
			</el-row>
		</div>
		
		<div id="recommend-wrapper">
			<el-row :gutter="30">
				<el-col :span="20">
					<div id="hot-recommend">
						<h3>热门推荐</h3>
						<el-divider></el-divider>
						<el-row :gutter="15">
							<el-col :span="8">
								<div class="book-cover-small">
									<router-link to="/">
										<img src="./images/recommend1.jpg" alt="">
									</router-link>
								</div>
								<div class="book-info">
									<router-link to="/">
										<strong>书名</strong><br>
									</router-link>
									<p class="book-introduce">内容简单介绍</p>
									<p>
										<i class="el-icon-user"></i>
										<span>作者</span>
										<span>类别</span>
									</p>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="book-cover-small">
									<router-link to="/">
										<img src="./images/recommend2.jpg" alt="">
									</router-link>
								</div>
								<div class="book-info">
									<router-link to="/" >
										<strong>书名</strong><br>
									</router-link>
									<p class="book-introduce">内容简单介绍</p>
									<p>
										<i class="el-icon-user"></i>
										<span>作者</span>
										<span>类别</span>
									</p>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="book-cover-small">
									<router-link to="/">
										<img src="./images/recommend3.jpg" alt="">
									</router-link>
								</div>
								<div class="book-info">
									<router-link to="/" >
										<strong>书名</strong><br>
									</router-link>
									<p class="book-introduce">内容简单介绍</p>
									<p>
										<i class="el-icon-user"></i>
										<span>作者</span>
										<span>类别</span>
									</p>
								</div>
							</el-col>
						</el-row>
						<el-divider></el-divider>
						<el-row :gutter="15">
							<el-col :span="8">
								<div class="book-cover-small">
									<router-link to="/">
										<img src="./images/recommend4.jpg" alt="">
									</router-link>
								</div>
								<div class="book-info">
									<router-link to="/" >
										<strong>书名</strong><br>
									</router-link>
									<p class="book-introduce">内容简单介绍</p>
									<p>
										<i class="el-icon-user"></i>
										<span>作者</span>
										<span>类别</span>
									</p>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="book-cover-small">
									<router-link to="/">
										<img src="./images/recommend5.jpg" alt="">
									</router-link>
								</div>
								<div class="book-info">
									<router-link to="/" >
										<strong>书名</strong><br>
									</router-link>
									<p class="book-introduce">内容简单介绍</p>
									<p>
										<i class="el-icon-user"></i>
										<span>作者</span>
										<span>类别</span>
									</p>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="book-cover-small">
									<router-link to="/">
										<img src="./images/recommend6.jpg" alt="">
									</router-link>
								</div>
								<div class="book-info">
									<router-link to="/" >
										<strong>书名</strong><br>
									</router-link>
									<p class="book-introduce">内容简单介绍</p>
									<p>
										<i class="el-icon-user"></i>
										<span>作者</span>
										<span>类别</span>
									</p>
								</div>
							</el-col>
						</el-row>
						<el-divider></el-divider>
						<el-row :gutter="15">
							<el-col :span="8">
								<div class="book-cover-small">
									<router-link to="/">
										<img src="./images/recommend7.jpg" alt="">
									</router-link>
								</div>
								<div class="book-info">
									<router-link to="/" >
										<strong>书名</strong><br>
									</router-link>
									<p class="book-introduce">内容简单介绍</p>
									<p>
										<i class="el-icon-user"></i>
										<span>作者</span>
										<span>类别</span>
									</p>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="book-cover-small">
									<router-link to="/">
										<img src="./images/recommend8.jpg" alt="">
									</router-link>
								</div>
								<div class="book-info">
									<router-link to="/" >
										<strong>书名</strong><br>
									</router-link>
									<p class="book-introduce">内容简单介绍</p>
									<p>
										<i class="el-icon-user"></i>
										<span>作者</span>
										<span>类别</span>
									</p>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="book-cover-small">
									<router-link to="/">
										<img src="./images/recommend9.jpg" alt="">
									</router-link>
								</div>
								<div class="book-info">
									<router-link to="/" >
										<strong>书名</strong><br>
									</router-link>
									<p class="book-introduce">内容简单介绍</p>
									<p>
										<i class="el-icon-user"></i>
										<span>作者</span>
										<span>类别</span>
									</p>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
				<el-col :span="4">
					<div id="new-book-recommend">
						<h3>本周强推</h3>
						<el-divider></el-divider>
						<ul>
							<li>
								<a href="#">[推荐小说1]</a>
							</li>
							<li>
								<a href="#">[推荐小说2]</a>
							</li>
							<li>
								<a href="#">[推荐小说3]</a>
							</li>
							<li>
								<a href="#">[推荐小说4]</a>
							</li>
							<li>
								<a href="#">[推荐小说5]</a>
							</li>
						</ul>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
</script>

<style>
	.book-cover-small{
		float: left;
	}
	.book-info{
		float: left;
		margin-left: 10px;
	}
</style>
