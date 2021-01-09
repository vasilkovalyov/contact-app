import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app';

Vue.use(VueRouter)


import Home from '../views/public/Home.vue';


const routes = [
	{
		path: '/',
		name: 'Home',
		meta: { layout: 'public-layout' },
		component: Home
	},
	{
		path: '/login',
		name: 'Login',
		meta: { layout: 'auth-layout' },
		component: () => import('../views/public/Login.vue')
	},
	{
		path: '/reset-password',
		name: 'ResetPassword',
		meta: { layout: 'auth-layout' },
		component: () => import('../views/public/ResetPassword.vue')
	},
	{
		path: '/register',
		name: 'Register',
		meta: { layout: 'auth-layout' },
		component: () => import('../views/public/Register.vue')
	},
	{
		path: '/edit/:id',
		name: 'EditUser',
		meta: { layout: 'admin-layout', auth: true },
		component: () => import('../views/admin/EditUser.vue')
	},
	{
		path: '/create',
		name: 'CreateUser',
		meta: { layout: 'admin-layout', auth: true },
		component: () => import('../views/admin/CreateUser.vue')
	},
	{
		path: '/create-quiz-game',
		name: 'CreateQuizGame',
		meta: { layout: 'admin-layout', auth: true },
		component: () => import('../views/admin/CreateQuizGame.vue')
	},
	{
		path: '/quiz-games',
		name: 'QuizGames',
		meta: { layout: 'admin-layout', auth: true },
		component: () => import('../views/admin/QuizGames.vue')
	},
	{
		path: '/users',
		name: 'Users',
		meta: { layout: 'admin-layout', auth: true },
		component: () => import('../views/admin/Users.vue')
	},
	{
		path: '/admin-profile',
		name: 'AdminProfile',
		meta: { layout: 'admin-layout', auth: true },
		component: () => import('../views/admin/AdminProfile.vue')
	},

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	const currentUser = firebase.auth().currentUser;
	const requiredAuth = to.matched.some(record => record.meta.auth);

	if(requiredAuth && !currentUser) {
		next('/login');
	} else {
		next();
	}
})

export default router
