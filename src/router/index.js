import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home/Home.vue';
import My from '../views/My/My.vue';
import Shelf from '../views/My/components/Shelf/Shelf.vue';
import Message from '../views/My/components/Message/Message.vue';
import Member from '../views/My/components/Member/Member.vue';
import Finance from '../views/My/components/Finance/Finance.vue';
import Search from '../views/Search/Search.vue';
import BookFilter from '../views/BookFilter/BookFilter.vue';
import Rank from '../views/Rank/Rank.vue';
import Error from '../views/Error/Error.vue';
import Book from '../views/Book/Book.vue';
import Chapter from '../views/Chapter/Chapter.vue';

// 因为在加载的 router 对象的时候，可能 store 对象还没有加载，所以我们只能使用
// import 引入，不能使用 this 
import store from '../store';

Vue.use(VueRouter);

let router = new VueRouter({
	mode: 'history',
	routes:[
		{
			path: '/',
			component: Home
		},
		{
			path: '/search/:keyword',
			component: Search
		},
		{
			path: '/all',
			component: BookFilter
		},
		{
			path: '/rank',
			component: Rank
		},
		{
			path: '/free',
			component: BookFilter
		},
		{
			path: '/finish',
			component: BookFilter
		},
		{
			path: '/error',
			component: Error
		},
		{
			path: '/book/:bookId',
			component: Book
		},
		{
			path: '/chapter/:bookId/:chapterId',
			component: Chapter
		},
		{
			path: '/my',
			component: My,
			meta: {
				requireLogin: true,
			},
			children: [
				{
					path: 'shelf',
					component: Shelf,
				},
				{
					path: 'message',
					component: Message,
				},
				{
					path: 'member',
					component: Member,
				},
				{
					path: 'finance',
					component: Finance,
				},
			]
		}
	]
})

// 我们在需要登陆的 路由对象  上面添加 meta 信息，这是个附加的信息，我们可以在守卫中获取
// 相关的信息。 当看到某一个路由对应的 meta 属性，有需要登陆的标志，我们就会去看看 store 
// 里面的  isLogined 属性是否为 true ，如果true 则调用 next() 放行
// 如果为 false ，那么我们就弹窗或者使用  next(path) 跳转到登陆注册

// 说明： 这里的 to 其实就是根据地址栏的地址去封装的一个 route 对象，我们地址写的啥，就封装啥
//        to 参数一定不会为空，但是不一定能匹配到合适的路由
//        ===> 所以我们最好是使用  to.matched   拿到输入地址匹配到的路由对象数组，然后再去判断
// 【注意】 如果是嵌套路由的话，那么 当我们访问   /my/message  的时候， to.matched 会返回一个长度为2
//         的路由数组， 分别是  /my   和  /my/message
 //        所以其实，如果 /my 包括其下面的所有子路由都需要登陆，我们可以只在父路由设置 meta即可
router.beforeEach((to, from, next)=>{
	// 如果匹配的路由中有一个 meta 里面写着需要登陆校验
	// 那么我们就去校验一下
	if(to.matched.some((route)=>{return route.meta.requireLogin})){
		console.log('需要登录才能访问');
		if(store.state.isLogined){
			// 如果是 true ，我们就放行
			console.log('已经登录，放行');
			next();
		}else{
			console.log('还未登录，弹出登陆窗口');
			// 因为我们打算把登陆/注册页面写成一个弹窗，所以这里不进行跳转
			// element-ui 的弹窗使用  dialog 组件，这个组件显示隐藏依靠一个绑定的变量
			// 我们同样把这个变量保存在  store 里面
			store.commit('updateIsShowLoginPage', true);
		}
	}else{
		next();
	}
});

export default router;