import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app';

Vue.use(VueRouter)


import Home from '../views/Home.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		meta: { layout: 'main-layout', auth: true },
		component: Home
	},
	{
		path: '/login',
		name: 'Login',
		meta: { layout: 'auth-layout' },
		component: () => import('../views/Login.vue')
	},
	{
		path: '/reset-password',
		name: 'ResetPassword',
		meta: { layout: 'auth-layout' },
		component: () => import('../views/ResetPassword.vue')
	},
	{
		path: '/register',
		name: 'Register',
		meta: { layout: 'auth-layout' },
		component: () => import('../views/Register.vue')
	},
	{
		path: '/edit/:id',
		name: 'EditUser',
		meta: { layout: 'main-layout', auth: true },
		component: () => import('../views/EditUser.vue')
	},
	{
		path: '/create',
		name: 'CreateUser',
		meta: { layout: 'main-layout', auth: true },
		component: () => import('../views/CreateUser.vue')
	},
	{
		path: '/admin-profile',
		name: 'AdminProfile',
		meta: { layout: 'main-layout', auth: true },
		component: () => import('../views/AdminProfile.vue')
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
