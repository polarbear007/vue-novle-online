<template>
	<div id="login-register-wrapper">
		<el-dialog :visible.sync="isShowLoginPage" @close="handleClose">
			<el-tabs v-model="activeName" >
				<el-tab-pane label="用户登录" name="login">
					<el-form ref="loginForm" :model="loginData" :rules="rules" label-position="right" label-width="100px">
						<el-form-item label="用户名" prop="username">
							<el-input clearable v-model="loginData.username" placeholder="请输入用户名"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input clearable show-password v-model="loginData.password" placeholder="请输入密码"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="login">登录</el-button>
							<el-button type="primary" @click="resetLoginForm">重置</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="用户注册" name="register">
					<el-form ref="registerForm" :model="registerData" :rules="rules" label-position="right" label-width="100px">
						<el-form-item label="用户名" prop="username">
							<el-input clearable v-model="registerData.username" placeholder="请输入用户名"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input clearable show-password v-model="registerData.password" placeholder="请输入密码"></el-input>
						</el-form-item>
						<el-form-item label="邮箱" prop="email">
							<el-input clearable v-model="registerData.email" placeholder="请输入邮箱"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="register">注册</el-button>
							<el-button type="primary" @click="resetRegisterForm">重置</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'LoginAndRegister',
	data() {
		return {
			activeName: 'login',
			loginData: {
				username: '',
				password: ''
			},
			registerData:{
				username: '',
				password: '',
				email: ''
			},
			rules: {
				username: [
					{ required: true, message: '用户名不能为空', trigger: 'blur' }, 
					{ min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' },
					{ pattern: /^\w+$/, message: '只能使用大小写字母、数字和下划线'}
				],
				password:[
					{required: true, message: '密码不能为空', trigger: 'blur'},
					{min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
				],
				email: [
					{required: true, message: '邮箱不能为空', trigger: 'blur'},
					{type: 'email', message: '输入的邮箱格式不合法', trigger: 'blur'}
				]
			}
		};
	},
	computed: {
		isShowLoginPage: {
			get() {
				return this.$store.state.isShowLoginPage;
			},
			set(newValue) {
				this.$store.commit('updateIsShowLoginPage', newValue);
			}
		}
	},
	methods: {
		// 当我们关闭 dialog 的时候，清除一下之前输入的数据
		handleClose() {
			this.resetLoginForm();
			this.resetRegisterForm();
		},
		resetLoginForm(){
			this.$refs.loginForm.resetFields();
		},
		resetRegisterForm(){
			this.$refs.registerForm.resetFields();
		},
		login(){
			// 因为我们还没有写后台程序，所以这里直接输入就算登录成功
			this.$store.commit('updateIsLogined', true);
			// 然后关闭 dialog 对话框, 因为我们已经有使用 computed 去映射过了，
			// 所以这里可以直接赋值
			this.isShowLoginPage = false;
		},
		register(){
			// 暂时不写，后台程序出来再写
		}
	},
};
</script>

<style></style>
