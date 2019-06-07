<template>
	<el-row :gutter="30">
		<el-col :span="5">
			<div id="selected-items">
				<div class="filter-title">已选</div>
				<div class="selected-container">
					<!-- 是否选择特定分类 -->
					<el-tag v-if="selected.category !== null" closable size="mini" type="info" @close="updateCategoryCondition(null)">
						{{selected.category.categoryName}}
					</el-tag>
					<!-- 是否选择字数条件 -->
					<el-tag v-if="selected.lengthRange !== null" closable size="mini" type="info" @close="updateLengthRangeCondition(null)">
						{{selected.lengthRange.tip}}
					</el-tag>
					<!-- 是否选择状态条件 -->
					<el-tag v-if="selected.bookState !== null" closable size="mini" type="info" @close="updatebookStateCondition(null)">
						{{selected.bookState.tip}}
					</el-tag>
					<!-- 是否选择 是否免费条件-->
					<el-tag v-if="selected.isFree !== null" closable size="mini" type="info" @close="updateIsFreeCondition(null)">
						{{selected.isFree.tip}}
					</el-tag>
					<!-- 是否选 更新时间条件 -->
					<el-tag v-if="selected.updateWithinDays !== null" closable size="mini" type="info" @close="updateUpdateWithinDaysCondition(null)">
						{{selected.updateWithinDays.tip}}
					</el-tag>
				</div>
			</div>
			<el-divider></el-divider>
			<div id="filter-wrapper">
				<div id="category-filter">
					<div class="filter-title">分类</div>
					<div class="filter-item">
						<el-row>
							<el-col :span="8">
								<el-button type="text" size="mini" @click="updateCategoryCondition(null)">全部</el-button>
							</el-col>
							<el-col :span="8" v-for="(category, index) in categoryList" :key="index">
								<el-button type="text" size="mini" @click="updateCategoryCondition(category)">{{ category.categoryName }}</el-button>
							</el-col>
						</el-row>
					</div>
				</div>
				<el-divider></el-divider>
				<div id="length-filter">
					<div class="filter-title">字数</div>
					<div class="filter-item">
						<el-row>
							<el-col :span="8">
								<el-button type="text" size="mini" @click="updateLengthRangeCondition(null)">全部</el-button>
							</el-col>
							<el-col :span="8" v-for="(lengthRange, index) in lengthRangeList" :key="index">
								<el-button type="text" size="mini" @click="updateLengthRangeCondition(lengthRange)">{{ lengthRange.tip }}</el-button>
							</el-col>
						</el-row>
					</div>
				</div>
				<el-divider></el-divider>
				<div id="state-filter">
					<div class="filter-title">状态</div>
					<div class="filter-item">
						<el-row>
							<el-col :span="8">
								<el-button type="text" size="mini" @click="updatebookStateCondition(null)">全部</el-button>
							</el-col>
							<el-col :span="8" v-for="(state, index) in bookStateList" :key="index">
								<el-button type="text" size="mini" @click="updatebookStateCondition(state)">{{state.tip}}</el-button>
							</el-col>
						</el-row>
					</div>
				</div>
				<el-divider></el-divider>
				<div id="is-free-filter">
					<div class="filter-title">是否付费</div>
					<div class="filter-item">
						<el-row>
							<el-col :span="8">
								<el-button type="text" size="mini" @click="updateIsFreeCondition(null)">全部</el-button>
							</el-col>
							<el-col :span="8" v-for="(isFree, index) in isFreeList" :key="index">
								<el-button type="text" size="mini" @click="updateIsFreeCondition(isFree)">
									{{isFree.tip}}
								</el-button>
							</el-col>
						</el-row>
					</div>
				</div>
				<el-divider></el-divider>
				<div id="update-time-filter">
					<div class="filter-title">更新时间</div>
					<div class="filter-item">
						<el-row>
							<el-col :span="8">
								<el-button type="text" size="mini" @click="updateUpdateWithinDaysCondition(null)">全部</el-button>
							</el-col>
							<el-col :span="8"
									v-for="(updateWithinDays, index) in updateWithinDaysList"
									:key="index">
								<el-button type="text" size="mini" @click="updateUpdateWithinDaysCondition(updateWithinDays)">
									{{updateWithinDays.tip}}
								</el-button>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</el-col>
		<el-col :span="19">
			<div id="filter-result-wrapper">
				<div id="sort-wrapper">
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
				<div id="filter-result">
					<el-row v-if="resultsByPage.list != undefined && resultsByPage.list.length > 0">
						<el-col :span="12" v-for="(bookInfo, index) in resultsByPage.list" :key="index">
							<div class="filter-result-item">
								<el-row :gutter="20">
									<el-col :span="7">
										<div id="book-cover">
											<router-link :to="`/book/${bookInfo.bookId}`">
												<img :src="bookInfo.bookCoverPath" 
													 :title="bookInfo.bookName"
													 height="150px"
													 width="auto">
											</router-link>
										</div>
									</el-col>
									<el-col :span="17">
										<div id="book-info">
											<router-link :to="`/book/${bookInfo.bookId}`">
												<span style="font-weight: bold; font-size: large;">{{bookInfo.bookName}}</span>
											</router-link>
											<p class="author" style="font-size: small; color: gray">
												{{bookInfo.author.authorName}}
											</p>
											<p class="category-bookState-length">
												<el-tag size="medium" type="warning">
													{{bookInfo.category.categoryName}}
												</el-tag>
												<el-tag v-if="bookInfo.bookState == 1" size="medium" type="success">
													连载中
												</el-tag>
												<el-tag v-if="bookInfo.bookState == 2" size="medium" type="success">
													已完结
												</el-tag>
												<el-tag size="medium">
													{{(bookInfo.bookLength / 10000).toFixed(2)}} 万
												</el-tag>
											</p>
											<p class="intro">
												{{bookInfo.bookIntroduce.trim()}}
											</p>
										</div>
									</el-col>
								</el-row>
							</div>
							<el-divider></el-divider>
						</el-col>
					</el-row>
					<el-row v-if="resultsByPage.list != undefined && resultsByPage.list.length == 0">
						没有找到相关的书籍
					</el-row>
				</div>
				<div id="page-wrapper">
					<el-pagination layout="prev,pager,next"
								   :current-page="resultsByPage.pageNum"
								   :total="resultsByPage.total"
								   background
								   @current-change="handleCurrentChange">
					</el-pagination>
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<script>
import {mapState} from 'vuex';
import axios from  'axios';

export default {
	name: 'BookFilter',
	data() {
		return {
			isLoading: false,
			selected:{
				pageSize: 10,
				currentPage: 1,
				category: null,
				bookState: null,
				isFree: null,
				orderByKey: null,
				lengthRange: null,
				updateWithinDays: null,
			},
			// 这个给后台发送的参数对象
			queryConditions:{
				pageSize: 10,
				currentPage: 1,
				categoryId: null,
				bookState: null,
				isFree: null,
				orderByKey: null,
				lengthRange: null,
				updateWithinDays: null,
			},
			// 分页查询的结果
			resultsByPage:{}
		};
	},
	computed: {
		...mapState(['categoryList', 'lengthRangeList', 'bookStateList', 'isFreeList', 'updateWithinDaysList'])
	},
	methods: {
		updateCategoryCondition(category){
			this.selected.category = category;
		},
		updatebookStateCondition(bookState){
			this.selected.bookState = bookState;
		},
		updateIsFreeCondition(isFree){
			this.selected.isFree = isFree;
		},
		updateLengthRangeCondition(lengthRange){
			this.selected.lengthRange = lengthRange;
		},
		updateUpdateWithinDaysCondition(updateWithinDays){
			this.selected.updateWithinDays = updateWithinDays;
		},
		updateSelectedByRouteParams(){
			// 我们先重置一下 selected 的值
			this.selected = {
				pageSize: 10,
				currentPage: 1,
				category: null,
				bookState: null,
				isFree: null,
				orderByKey: null,
				lengthRange: null,
				updateWithinDays: null
			};
			
			// 先保存一下 请求路径上面的参数
			let params = this.$route.query;
			if(params.pageSize !== undefined){
				this.selected.pageSize = params.pageSize;
			}
			if(params.currentPage !== undefined){
				this.selected.currentPage = params.currentPage;
			}
			if(params.category !== undefined){
				let category = this.categoryList.find((element)=>{
					return params.category == element.categoryId;
				});
				this.selected.category = category;
			}else if(params.isFree !== undefined){
				let isFree = this.isFreeList.find((element)=>{
					return params.isFree == element.isFree;
				});
				this.selected.isFree = isFree;
			}else if(params.bookState !== undefined){
				let bookState = this.bookStateList.find((element)=>{
					return element.state == params.bookState;
				});
				this.selected.bookState = bookState;
			}
		},
		// 根据查询条件   queryConditions，向后台发送请求
		// 本来这里应该使用 get 请求，但是get 请求无法发送复合的对象
		// queryConditions 里面的 lengthRange 属性，是一个对象
		// springmvc 默认解析pojo 的包装类时，需要使用对象导航，即  lengthRange.from 这种形式
		// 而 get 并不会那么智能，因此这里只好改成post 请求，发送 json 数据
		queryByConditions(){
			axios({
				url: 'http://localhost:8081/getBookInfoByConditions',
				method: 'post',
				data: this.queryConditions,
				responseType: 'json',
			}).then((response)=>{
				this.resultsByPage = response.data;
			}).catch((error)=>{
				this.$router.push("/error");
			});
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
		},
		handleCurrentChange(currentPage){
			this.queryConditions.currentPage = currentPage;
		}
	},
	mounted(){
		// 请求后台加载某些数据到 store.state 里面
		this.$store.dispatch('loadConditionsInfo');
		// state 里面有了数据以后，我们再去根据 路由参数更新本页的  selected 
		// 这里不能直接就更新 selected ，因为上一个函数是异步请求后台数据
		// 如果后台数据还没有到，你直接更新的话，会报异常
		let i = 1;
		let timer = setInterval(()=>{
			// 这里尝试50次以后，还是无法成功渲染的话，就取消定时器，防止后台有问题而一直尝试
			if(i++ > 50){
				clearInterval(timer);
				this.$router.push("/error");
			}
			if(this.$store.state.isConditionsInfoLoad){
				this.updateSelectedByRouteParams();
				clearInterval(timer);
			}
		},100);
	},
	watch: {
		$route(){
			this.updateSelectedByRouteParams();
		},
		selected:{
			deep: true,
			handler: function(newValue){
				if(newValue.pageSize !== null){
					this.queryConditions.pageSize = newValue.pageSize;
				}else{
					this.queryConditions.pageSize = 10;
				}
				
				if(newValue.currentPage !== null){
					this.queryConditions.currentPage = newValue.currentPage;
				}else{
					this.queryConditions.currentPage = 1;
				}
				
				if(newValue.category !== null){
					this.queryConditions.categoryId = newValue.category.categoryId;
				}else{
					this.queryConditions.categoryId = null;
				}
				
				if(newValue.bookState !== null){
					this.queryConditions.bookState = newValue.bookState.state;
				}else{
					this.queryConditions.bookState = null;
				}
				
				if(newValue.isFree !== null){
					this.queryConditions.isFree = newValue.isFree.isFree;
				}else{
					this.queryConditions.isFree = null;
				}
				
				if(newValue.updateWithinDays !== null){
					this.queryConditions.updateWithinDays = newValue.updateWithinDays.daysAgo;
				}else{
					this.queryConditions.updateWithinDays = null;
				}
				this.queryConditions.orderByKey = newValue.orderByKey;
				this.queryConditions.lengthRange = newValue.lengthRange;
			}
		},
		queryConditions: {
			deep: true,
			handler: function(newQueryByConditions){
				// 前面各种封装，最后发送ajax 请求后台数据
				console.log(newQueryByConditions);
				this.queryByConditions();
			}
		}
	}
};
</script>

<style>
.filter-title {
	font-weight: bold;
}
#book-info .intro{
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
#page-wrapper{
	text-align: center;
}
</style>
