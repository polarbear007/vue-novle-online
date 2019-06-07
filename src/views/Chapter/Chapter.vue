<template>
	<div>
		<div id="bread-crumb-nav">
			<el-breadcrumb v-if="bookInfo != null" separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/all', query: { category: bookInfo.category.categoryId } }">{{ bookInfo.category.categoryName }}</el-breadcrumb-item>
				<el-breadcrumb-item :to="`/book/${bookInfo.bookId}`">{{ bookInfo.bookName }}</el-breadcrumb-item>
				<el-breadcrumb-item>{{currentChapter.chapterTitle}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div id="chapter-content-wrapper" >
			<template v-if="currentChapter != null">
				<span  v-html="currentChapter.chapterContent"></span>
			</template>
		</div>
		<div id="chapter-control-wrapper">
			<el-row>
				<el-col :span="8" style="text-align: center;">
					<el-button type="danger" v-if="preChapter == null" disabled>上一章</el-button>
					<el-button type="danger" v-else @click="turnTo(bookInfo.bookId, preChapter.chapterId)">上一章</el-button>
				</el-col>
				<el-col :span="8" style="text-align: center;" v-if="bookInfo != null">
					<router-link :to="`/book/${bookInfo.bookId}`">
						<el-button type="danger">返回目录</el-button>
					</router-link>
				</el-col>
				<el-col :span="8" style="text-align: center;">
					<el-button type="danger" v-if="nextChapter == null" disabled>下一章</el-button>
					<el-button type="danger" v-else @click="turnTo(bookInfo.bookId, nextChapter.chapterId)">下一章</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default{
		name: 'Chapter',
		data() {
			return {
				currentChapter:{chapterContent: ''},
				preChapter: null,
				nextChapter: null
			}
		},
		computed: {
			...mapState(['bookInfo', 'chapterList', 'isBookInfoAndChapterListLoad']),
		},
		methods: {
			getCurrentChapterByRouteParams() {
				let bookId = this.$route.params.bookId;
				if(!parseInt(bookId)){
					alert("非法路径");
					this.$router.push('/error');
				}
				let chapterId = this.$route.params.chapterId;
				if(!parseInt(chapterId)){
					alert("非法路径");
					this.$router.push('/error');
				}
				// 如果前面获取路径参数没有什么问题，我们再去加载对应的内容
				this.loadChaptersFromStoreByBookIdAndChapterId(bookId, chapterId)
			},
			// 试图从 store 里面加载章节内容
			loadChaptersFromStoreByBookIdAndChapterId(bookId, chapterId){
				// 先把 isBookInfoAndChapterListLoad 状态改成 false
				this.$store.commit('updateIsBookInfoAndChapterListLoad', false);
				
				// 不管怎么样，我们先根据 bookId 加载 bookInfo 和 chapterList
				// 如果已经有了，就不会再加载
				this.$store.dispatch('loadBookInfoAndChapterListByBookId', bookId);
				
				let i = 1;
				let timer = setInterval(()=>{
					i++;
					
					if(this.isBookInfoAndChapterListLoad){
						// 一旦进来，先清除定时器
						clearInterval(timer);
						
						let currentIndex = this.chapterList.findIndex((element)=>{
							return element.chapterId == chapterId;
						});
						
						if(currentIndex != -1){
							this.currentChapter = this.chapterList[currentIndex];
							// 去加载这个 currentChapter 对应的 章节内容
							this.$store.dispatch('loadCurrentChapterContent', currentIndex);
							if(currentIndex > 0){
								this.preChapter = this.chapterList[currentIndex - 1];
							}else{
								this.preChapter = null;
							}
							if(currentIndex < this.chapterList.length -1){
								this.nextChapter = this.chapterList[currentIndex + 1];
							}else{
								this.nextChapter = null;
							}
						}else{
							// 如果为 -1 说明 chapterId 不存在，我们直接alert ，然后跳转
							alert("不存在此章节！");
							this.$router.push('/error');
						}
					}
					
					// 如果尝试加载 20 次，都还没能加载成功的话，那么我们就清除定时 器，并跳转到错误页面
					if(i> 20){
						clearInterval(timer);
						this.$router.push("/error");
					}
				}, 200);
			},
			turnTo(bookId, chapterId){
				this.$router.push("/chapter/" + bookId + "/" + chapterId);
			}
		},
		mounted(){
			this.getCurrentChapterByRouteParams();
		},
		watch:{
			$route(){
				this.getCurrentChapterByRouteParams();
			}
		}
	}
</script>

<style>
	#chapter-content-wrapper{
		margin: 30px 0px;
		background: #E6E6FA;
		padding: 20px;
		font-size: large;
		line-height: 2em;
		text-indent: 2em;
	}
</style>
