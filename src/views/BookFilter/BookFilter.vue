<template>
	<el-row :gutter="30">
		<el-col :span="5">
			<div id="selected-items">
				<div class="filter-title">已选</div>
				<div class="selected-container">
					<el-tag closable
							size="mini"
							type="info"
							v-for="(value, key) in selected"
							:key="key"
							v-if="key !== 'pageSize' && key !== 'currentPage' && value.id !== 0 && value.id !== undefined"
							@close="deleteItem(key)">
						{{value.value}}
					</el-tag>
				</div>
			</div>
			<el-divider></el-divider>
			<div id="filter-wrapper">
				<div id="category-filter">
					<div class="filter-title">分类</div>
					<div class="filter-item">
						<el-row>
							<el-col :span="8" v-for="(category, index) in categoryList" :key="index">
								<el-button type="text" size="mini" @click="updateSelected('category', categoryList, index)">{{ category.value }}</el-button>
							</el-col>
						</el-row>
					</div>
				</div>
				<el-divider></el-divider>
				<div id="length-filter">
					<div class="filter-title">字数</div>
					<div class="filter-item">
						<el-row>
							<el-col :span="8" v-for="(length, index) in lengthList" :key="index">
								<el-button type="text" size="mini" @click="updateSelected('length', lengthList, index)">{{ length.value }}</el-button>
							</el-col>
						</el-row>
					</div>
				</div>
				<el-divider></el-divider>
				<div id="state-filter">
					<div class="filter-title">状态</div>
					<div class="filter-item">
						<el-row>
							<el-col :span="8"
									v-for="(state, index) in stateList"
									:key="index">
								<el-button type="text" size="mini" @click="updateSelected('state', stateList, index)">
									{{state.value}}
								</el-button>
							</el-col>
						</el-row>
					</div>
				</div>
				<el-divider></el-divider>
				<div id="is-free-filter">
					<div class="filter-title">是否付费</div>
					<div class="filter-item">
						<el-row>
							<el-col :span="8"
									v-for="(isFree, index) in isFreeList"
									:key="index">
								<el-button type="text" size="mini" @click="updateSelected('isFree', isFreeList, index)">
									{{isFree.value}}
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
							<el-col :span="8"
									v-for="(updateTime, index) in updateTimeList"
									:key="index">
								<el-button type="text" size="mini" @click="updateSelected('updateTime', updateTimeList, index)">
									{{updateTime.value}}
								</el-button>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</el-col>
		<el-col :span="19"><div id="filter-result-wrapper">过滤的结果</div></el-col>
	</el-row>
</template>

<script>
import {mapState} from 'vuex';
import axios from  'axios';

export default {
	name: 'BookFilter',
	data() {
		return {
			selected:{
				pageSize: 10,
				currentPage: 1,
				category: {},
				length: {},
				state: {},
				isFree: {},
				updateTime: {}
			}
		};
	},
	computed: {
		...mapState(['categoryList', 'lengthList', 'stateList', 'isFreeList', 'updateTimeList'])
	},
	methods: {
		// 这里我们暂时把代码写死了，以后再想办法优化
		// 因为可能查找的条件会有所变化
		deleteItem(key) {
			if(key === 'category'){
				this.updateSelected(key, this.categoryList, 0);
			}else if(key === 'length'){
				this.updateSelected(key, this.lengthList, 0);
			}else if(key === 'state'){
				this.updateSelected(key, this.stateList, 0);
			}else if(key === 'isFree'){
				this.updateSelected(key, this.isFreeList, 0);
			}else if(key === 'updateTime'){
				this.updateSelected(key, this.updateTimeList, 0);
			}
		},
		updateSelected(key, filterList, index) {
			this.selected[key] = filterList[index];
		},
		// 根据 selected 来发送请求，我们直接把整个 selected 发送到后台
		// 后台只要搞一个结构一样的包装类来接收就好了
		// 其实 前台 要方便的话，应该是搞一个数组
		// 但是使用数组，请求后台的时候，又不太方便，所以这里搞了这么一个复合的对象
		// 暂时没有更好的思路
		queryBySelectedList(){
			console.log('根据 selected 发送 ajax 请求');
			axios({
				// 这里只是模拟一下，并不想真正去请求后台，所以写了默认的 8080 端口，防止报错
				url: 'http://localhost:8080',
				method: 'get',
				params: this.selected,
				responseType: 'json',
			}).then(function(response){
				console.log(response.data);
			}).catch(function(error){
				console.log(error.response.data);
			});
		},
		// 点击导航栏跳转到分类查询页面时,需要执行此函数
		// 其实在分类查询页面时，也可能直接点击导航栏
		updateSelectedListByQueryParams(){
			// 我们先重置一下 selected 的值
			this.selected = {
				pageSize: 10,
				currentPage: 1,
				category: {},
				length: {},
				state: {},
				isFree: {},
				updateTime: {}
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
				this.updateSelected('category', this.categoryList, params.category);
			}else if(params.isFree !== undefined){
				this.updateSelected('isFree', this.isFreeList, params.isFree);
			}else if(params.state !== undefined){
				this.updateSelected('state', this.stateList, params.state);
			}
		}
	},
	mounted(){
		this.updateSelectedListByQueryParams();
	},
	watch: {
		$route(){
			this.updateSelectedListByQueryParams();
		},
		selected:{
			deep: true,
			handler: function(){
				this.queryBySelectedList();
			}
		}
	}
};
</script>

<style>
.filter-title {
	font-weight: bold;
}
</style>
