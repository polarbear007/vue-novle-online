import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLogined: false,
		isShowLoginPage: false,
		categoryList: [
			{ id: 0, name: 'category', value: '全部' },
			{ id: 1, name: 'category', value: '现代言情' },
			{ id: 2, name: 'category', value: '古代言情' },
			{ id: 3, name: 'category', value: '浪漫青春' },
			{ id: 4, name: 'category', value: '玄幻言情' },
			{ id: 5, name: 'category', value: '仙侠奇缘' },
			{ id: 6, name: 'category', value: '悬疑灵异' },
			{ id: 7, name: 'category', value: '科幻空间' },
			{ id: 8, name: 'category', value: '游戏竞技' },
			{ id: 9, name: 'category', value: '短篇小说' },
			{ id: 10, name: 'category', value: '轻小说' }
		],
		lengthList: [
			{ id: 0, name: 'length', value: '全部' },
			{ id: 1, name: 'length', value: '30万以下' },
			{ id: 2, name: 'length', value: '30~50万' },
			{ id: 3, name: 'length', value: '50~100万' },
			{ id: 4, name: 'length', value: '100~200万' },
			{ id: 5, name: 'length', value: '200万以上' }
		],
		stateList: [
			{ id: 0, name: 'state', value: '全部'},
			{ id: 1, name: 'state', value: '连载'},
			{ id: 2, name: 'state', value: '完结'},
		],
		isFreeList: [
			{ id: 0, name: 'isFree', value: '全部'},
			{ id: 1, name: 'isFree', value: '付费'},
			{ id: 2, name: 'isFree', value: '免费'},
		],
		updateTimeList: [
			{id: 0, name: 'updateTime', value: '全部'},
			{id: 1, name: 'updateTime', value: '三日内'},
			{id: 2, name: 'updateTime', value: '七日内'},
			{id: 3, name: 'updateTime', value: '半月内'},
			{id: 4, name: 'updateTime', value: '一月内'},
		],
	},
	getters:{
		
	},
	mutations:{
		updateIsShowLoginPage(state, payload){
			state.isShowLoginPage = payload;
		},
		updateIsLogined(state, payload){
			state.isLogined = payload;
		}
	},
	actions:{
		
	},
	modules:{
		
	}
})