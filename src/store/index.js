import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// 引入router 组件，如果请求不到后台数据，我们这里可以跳转到错误页面
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLogined: false,
		isShowLoginPage: false,
		// 这个变量是表示是否已经加载分类查询页面所需要的那些条件信息
		isConditionsInfoLoad: false,
		isBookInfoAndChapterListLoad: true,
		categoryList: [],
		lengthRangeList: [],
		bookStateList: [],
		isFreeList: [],
		updateWithinDaysList: [],
		// 书籍详情页面 和 章节页面可以共用的变量
		bookInfo:null,
		chapterList: []
	},
	getters:{
		
	},
	mutations:{
		updateIsShowLoginPage(state, payload){
			state.isShowLoginPage = payload;
		},
		updateIsLogined(state, payload){
			state.isLogined = payload;
		},
		updateConditionsInfo(state, payload){
			// 更新这个基本的条件数据
			state.categoryList = payload.categoryList;
			state.lengthRangeList = payload.lengthRangeList;
			state.bookStateList = payload.bookStateList;
			state.isFreeList = payload.isFreeList;
			state.updateWithinDaysList = payload.updateWithinDaysList;
			// 最后把 isConditionsInfoLoad 设置为 true
			state.isConditionsInfoLoad = true;
		},
		updateIsBookInfoAndChapterListLoad(state, payload){
			state.isBookInfoAndChapterListLoad = payload;
		},
		updateBookInfoAndChapterList(state, payload){
			state.bookInfo = payload.bookInfo;
			state.chapterList = payload.chapterList;
		},
		updateChapterListByIndex(state, {currentIndex, chapterContent}){
			state.chapterList[currentIndex].chapterContent = chapterContent;
		}
	},
	actions:{
		// 加载分类查询的一些基本参数
		// 全局只需要加载一次即可
		// 加载前，默认  isConditionsInfoLoad=false , 加载后改为 true
		loadConditionsInfo(context){
			if(!context.state.isConditionsInfoLoad){
				axios({
					url: 'http://localhost:8081/getPrimaryInfo',
					method: 'get',
					responseType: 'json',
				}).then(function(response){
					context.commit('updateConditionsInfo', response.data);
				}).catch(function(error){
					// 如果请求不到后台数据,我们就跳转到错误页面
					// alert("系统错误!");
					router.push("/error");
				});
			}
		},
		// 通过 BookId 去加载 BookInfo 和 chapterList 对象。 图书详情页面 和 章节页面都需要。
		// 执行此方法前，一般需要把   isBookInfoAndChapterListLoad 设置为 false
		// 等加载完毕，再把  isBookInfoAndChapterListLoad 的值改成  true
		loadBookInfoAndChapterListByBookId(context, bookId){
			// 如果 bookInfo 为 null ，说明没有请求过后台，发送ajax 请求
			// 如果 bookInfo.bookId 跟传入的 bookId 不一样，说明查看的书籍变了，发送ajax 请求
			// bookInfo 跟 chapterList 是配对的，都是一起更新的，所以我们这里只判断bookInfo
			if(context.state.bookInfo === null || bookId != context.state.bookInfo.bookId){
				console.log('发送ajax请求 bookInfo 和 chapterList');
				axios({
					url: 'http://localhost:8081/getBookInfoAndChapterListByBookId',
					method: 'get',
					params: {bookId: bookId}
				}).then((response)=>{
					context.commit("updateBookInfoAndChapterList", response.data);
					// 异步加载完成后，把状态改成 true
					context.commit('updateIsBookInfoAndChapterListLoad', true);
				}).catch((error)=>{
					router.push("/error");
				})
			}
			// 不需要加载的话，我们同样把 isBookInfoAndChapterListLoad  改成 true
			context.commit('updateIsBookInfoAndChapterListLoad', true);
		},
		// 加载指定章节的内容
		// 如果已经加载过了的话，就不需要再加载了
		loadCurrentChapterContent(context, currentIndex){
			let currentChapter = context.state.chapterList[currentIndex];
			if(currentChapter.chapterContent == null){
				console.log('发送ajax请求章节内容');
				axios({
					url: 'http://localhost:8081/getChapterContentByChapterId',
					method: 'get',
					params: {chapterId: currentChapter.chapterId}
				}).then((response)=>{
					let chapterContent = response.data.trim().replace(/\s+/g, '</p><p>');
					// 拿到章节内容以后，我们去更新那个章节目录列表对应的章节对象
					context.commit('updateChapterListByIndex', {currentIndex, chapterContent});
				}).catch((error)=>{
					router.push('/error');
				})
			}
		}
	},
	modules:{
		
	}
})