<template>
	<div id="search-result">
		<el-row :gutter="30">
			<el-col :span="18">
				<div id="sort-bar-wrapper">
					<el-row :gutter="20">
						<el-col :span="2">
							<el-button type="text" @click="setOrderBy(null)">默认</el-button>
						</el-col>
						<el-col :span="3">
							<el-button type="text" @click="setOrderBy('updateTime')">
								更新时间
								<i v-if="queryConditions.orderByKey == 4" class="el-icon-bottom"></i>
								<i v-if="queryConditions.orderByKey == 3" class="el-icon-top"></i>
							</el-button>
						</el-col>
						<el-col :span="3">
							<el-button type="text" @click="setOrderBy('length')">
								总字数
								<i v-if="queryConditions.orderByKey == 2" class="el-icon-bottom"></i>
								<i v-if="queryConditions.orderByKey == 1" class="el-icon-top"></i>
							</el-button>
						</el-col>
						<el-col :span="4" :offset="12">
							<span>
								共找到<font color="red">{{resultsByPage.total}}</font>本书
							</span>
						</el-col>
					</el-row>
					<el-divider></el-divider>
				</div>
				<div id="result-list-wrapper">
					<div class="result-list-item" v-if="resultsByPage.list.length > 0" v-for="(bookInfo, index) in resultsByPage.list" :key="index">
						<el-row>
							<el-col :span="4">
								<div id="book-cover">
									<router-link :to="`/book/${bookInfo.bookId}`">
										<img :src="bookInfo.bookCoverPath" 
											 :title="bookInfo.bookName"
											 height="150px"
											 width="auto">
									</router-link>
								</div>
							</el-col>
							<el-col :span="12">
								<div id="book-mid-info">
									<router-link class="book-name" :to="`/book/${bookInfo.bookId}`">
										<span style="font-weight: bold; font-size: large;">{{bookInfo.bookName}}</span>
									</router-link>
									<p class="author-category-bookState">
										<router-link to="">
											<el-tag size="medium" type="danger">
												<i class="el-icon-user"></i>
												{{bookInfo.author.authorName}}
											</el-tag>
										</router-link>
										<router-link to="">
											<el-tag size="medium" type="warning">
												{{bookInfo.category.categoryName}}
											</el-tag>
										</router-link>
										<span v-if="bookInfo.bookState == 1">
											<el-tag size="medium" type="success">
												连载中
											</el-tag>
										</span>
										<span v-if="bookInfo.bookState == 2">
											<el-tag size="medium" type="success">
												已完结
											</el-tag>
										</span>
										<span v-if="bookInfo.isFree == 1">
											<el-tag size="medium">
												付费
											</el-tag>
										</span>
										<span v-if="bookInfo.isFree == 2">
											<el-tag size="medium">
												免费
											</el-tag>
										</span>
									</p>
									<p class="intro">
										{{bookInfo.bookIntroduce.trim()}}
									</p>
								</div>
							</el-col>
							<el-col :span="8">
								<div id="book-right-info">
									<p id="book-length" align="right">
										{{(bookInfo.bookLength/10000).toFixed(2)}}万 总字数
									</p>
									<p id="update-time" align="right">
										<span style="font-size: small;">{{bookInfo.lastUpdateTime | dateToStr("YYYY-MM-DD HH:mm:ss")}}</span> 更新时间
									</p>
									<div id="book-btn" align="right" style="position: absolute; bottom: 4px; right: 4px;">
										<el-button type="danger">书籍详情</el-button>
										<el-button type="primary">加入书架</el-button>
									</div>
								</div>
							</el-col>
						</el-row>
						<el-divider></el-divider>
					</div>
					<div v-if="resultsByPage.list.length === 0">
						没有找到相关的书籍
					</div>
				</div>
				
				<div id="page-wrapper">
					<el-pagination layout="prev,pager,next"
								   :current-page="resultsByPage.pageNum"
								   :total="resultsByPage.total"
								   background
								   @current-change="handleCurrentChange">
					</el-pagination>
				</div>
			</el-col>
			<el-col :span="6">
				<div id="book-recommend-wrapper">
					<h2>本周强推</h2>
					<el-divider></el-divider>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { Loading } from 'element-ui';
import axios from 'axios';
import moment from 'moment';

export default {
	name: 'Search',
	data() {
		return {
			queryConditions: {
				pageSize: 10,
				currentPage: 1,
				keyword: '',
				orderByKey: null
			},
			// 分页查询的结果
			resultsByPage: {
				total: 70,
				list: [],
				pageNum: 1,
				pageSize: 10,
				size: 10,
				startRow: 1,
				endRow: 10,
				pages: 7,
				prePage: 0,
				nextPage: 2,
				isFirstPage: true,
				isLastPage: false,
				hasPreviousPage: false,
				hasNextPage: true,
				navigatePages: 8,
				navigatepageNums: [1, 2, 3, 4, 5, 6, 7],
				navigateFirstPage: 1,
				navigateLastPage: 7
			}
		};
	},
	mounted() {
		this.updateQueryConditionsByRouteParams();
	},
	watch: {
		$route(newRoute) {
			this.updateQueryConditionsByRouteParams();
		},
		// 监视查询条件，一旦发生变化，我们就请求后台
		queryConditions:{
			deep: true,
			handler: function(newConditions) {
				this.queryByConditions(newConditions);
			}
		}
	},
	methods: {
		updateQueryConditionsByRouteParams() {
			// 我们先重置一下 queryConditions 的值
			this.queryConditions = {
				pageSize: 10,
				currentPage: 1,
				keyword: '',
				orderByKey: null
			};

			if (this.$route.params.keyword !== undefined) {
				this.queryConditions.keyword = this.$route.params.keyword;
			}
		},
		queryByConditions(conditions) {
			axios({
				url: 'http://localhost:8081/getBookInfoByKeyword',
				method: 'get',
				params: conditions,
				responseType: 'json'
			})
				.then(response => {
					this.resultsByPage = response.data;
				})
				.catch(error => {
					console.log(error.response.data);
				});
		},
		handleCurrentChange(currentPage){
			this.queryConditions.currentPage = currentPage;
		},
		// 1 按长度升序
		// 2 按长度降序
		// 3 按更新时间升序
		// 4 按更新时间降序
		// 一般来说，都是优先降序的
		setOrderBy(option){
			if(option === null){
				this.queryConditions.orderByKey = null;
			}else if(option === 'length'){
				// 只有等于2 的时候，我们才把  orderByKey 改成1
				if(this.queryConditions.orderByKey === 2){
					this.queryConditions.orderByKey = 1;
				}else{
					// 其他情况下，都是改成 2
					this.queryConditions.orderByKey = 2;
				}
			}else if(option === 'updateTime'){
				// 只有等于4 的时候，我们才把  orderByKey 改成3
				if(this.queryConditions.orderByKey === 4){
					this.queryConditions.orderByKey = 3;
				}else{
					// 其他情况下，都是改成 2
					this.queryConditions.orderByKey = 4;
				}
			}
		}
	},
	filters: {
		dateToStr: function(date, format) {
			if(date){
				return moment(date).format(format || 'YYYY-MM-DD HH:mm:ss');
			}else{
				return "";
			}
		}
	}
};
</script>

<style>
	.intro{
		 overflow: hidden;
		 text-overflow: ellipsis;
		 display: -webkit-box;
		 -webkit-line-clamp: 3;
		 -webkit-box-orient: vertical;
	}
</style>
