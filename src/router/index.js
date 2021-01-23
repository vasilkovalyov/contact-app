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
		path: '/admin',
		name: 'HomeAdmin',
		meta: { layout: 'admin-layout', auth: true },
		component: () => import('../views/admin/HomeAdmin.vue')
	},
	{
		path: '/admin/admin-profile',
		name: 'AdminProfile',
		meta: { layout: 'admin-layout', auth: true },
		component: () => import('../views/admin/AdminProfile.vue')
	},
	{
		path: '/admin/users',
		name: 'Users',
		meta: { layout: 'admin-layout', auth: true },
		component: () => import('../views/admin/users/Users.vue')
	},
	{
		path: '/admin/create',
		name: 'CreateUser',
		meta: { layout: 'admin-layout', auth: true },
		component: () => import('../views/admin/users/CreateUser.vue')
	},
	{
		path: '/admin/edit/:id',
		name: 'EditUser',
		meta: { layout: 'admin-layout', auth: true },
		component: () => import('../views/admin/users/EditUser.vue')
	},
	{
		path: '/admin/quiz-games',
		name: 'QuizGames',
		meta: { layout: 'admin-layout', auth: true },
		component: () => import('../views/admin/games/QuizGames.vue')
	},
	{
		path: '/admin/create-quiz-game',
		name: 'CreateQuizGame',
		meta: { layout: 'admin-layout', auth: true },
		component: () => import('../views/admin/games/CreateQuizGame.vue')
	},
	{
		path: '/admin/edit-game/:id',
		name: 'EditGame',
		meta: { layout: 'admin-layout', auth: true },
		component: () => import('../views/admin/games/EditGame.vue')
	},
	{
		path: '/admin/quiz-questions',
		name: 'QuizQuestions',
		meta: { layout: 'admin-layout', auth: true },
		component: () => import('../views/admin/questions/QuizQuestions.vue')
	},
	{
		path: '/admin/view-questions/:id',
		name: 'ViewQuestions',
		meta: { layout: 'admin-layout', auth: true },
		component: () => import('../views/admin/questions/ViewQuestions.vue')
	},
	{
		path: '/admin/create-quiz-questions',
		name: 'CreateQuizQuestions',
		meta: { layout: 'admin-layout', auth: true },
		component: () => import('../views/admin/questions/CreateQuizQuestions.vue')
	},
	{
		path: '/admin/edit-question/game/:game/question/:question',
		name: 'EditQuestion',
		meta: { layout: 'admin-layout', auth: true },
		component: () => import('../views/admin/questions/EditQuestion.vue')
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
