<template>
	<div id="book-info-page-wrapper">
		<div id="bread-crumb-nav">
			<el-breadcrumb v-if="bookInfo != null" separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/all', query: { category: bookInfo.category.categoryId } }">{{ bookInfo.category.categoryName }}</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/book', params: { bookId: bookInfo.bookId }}">{{ bookInfo.bookName }}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div id="book-info-detail" v-if="bookInfo != null">
			<el-row :gutter="100">
				<el-col :span="4">
					<div id="book-cover"><img :src="bookInfo.bookCoverPath" :title="bookInfo.bookName" /></div>
				</el-col>
				<el-col :span="20">
					<div id="book-info">
						<h2 class="book-name" style="font-weight: bold; font-size: larger;">{{ bookInfo.bookName }}</h2>
						<span class="author">{{ bookInfo.author.authorName }} 著</span>
						<p class="category-bookState-length">
							<el-tag size="medium" type="warning">{{ bookInfo.category.categoryName }}</el-tag>
							<el-tag v-if="bookInfo.bookState == 1" size="medium" type="success">连载中</el-tag>
							<el-tag v-if="bookInfo.bookState == 2" size="medium" type="success">已完结</el-tag>
							<el-tag size="medium">{{ (bookInfo.bookLength / 10000).toFixed(2) }} 万</el-tag>
						</p>
						<p :class="{intro: isClose}" v-html="bookInfo.bookIntroduce.replace(/\n/g, '<br>')"></p>
						
						<p class="btn">
							<el-button type="text" @click="isClose = !isClose">
								<template v-if="isClose">
									<i class="el-icon-bottom"></i>
									展开
								</template>
								<template v-else>
									<i class="el-icon-top"></i>
									收起
								</template>
							</el-button>
						</p>
						<p class="btn">
							<router-link :to="`/chapter/${bookInfo.bookId}/${chapterList[0].chapterId}`">
								<el-button type="danger">马上阅读</el-button>
							</router-link>
							<el-button type="primary">加入书架</el-button>
						</p>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="chapter-list-wrapper">
			<div id="chapter-info">
				<span style="font-size: x-large;">章节目录</span>
				<span style="margin-left: 30px;">共计{{chapterList.length}}章</span>
			</div>
			<el-divider></el-divider>
			<el-row :gutter="30" v-if="chapterList.length > 0">
				<el-col :span="8" v-for="(chapter, index) in chapterList" :key="index">
					<router-link class="chapter-link" tag="span" :to="`/chapter/${bookInfo.bookId}/${chapter.chapterId}`">
						{{chapter.chapterTitle}}
					</router-link>
					<el-divider></el-divider>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex';

export default {
	name: 'Book',
	data() {
		return {
			isClose: true
		};
	},
	computed: {
		...mapState(['bookInfo', 'chapterList']),
	},
	methods: {
		getDataByRouteParams() {
			// 如果路径参数不为空，那么我们就请求加载
			// 并且参数的类型可以转成数字，我们再去请求加载
			let bookId = this.$route.params.bookId;
			if(bookId != undefined && parseInt(bookId)){
				this.$store.dispatch('loadBookInfoAndChapterListByBookId', bookId);
			}else{
				this.$router.push("/error");
			}
		}
	},
	mounted(){
		this.getDataByRouteParams();
	},
};
</script>

<style>
#bread-crumb-nav {
	margin-bottom: 20px;
}
#book-info-detail{
	margin: 0px, 20px;
	background: lavender;
	padding: 20px;
}

#book-info .btn{
	text-align: right;
}

#book-info .intro{
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}

.chapter-list-wrapper{
	margin: 30px 0px;
	background: #E6E6FA;
	padding: 20px;
}

.chapter-link{
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}

.chapter-link:hover{
	cursor: pointer;
	color: red;
}
</style>
