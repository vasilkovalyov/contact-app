import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app';

Vue.use(VueRouter)

import Home from '../views/Home.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		meta: { layout: 'main-layout', auth: true },
		component: Home
	},
	{
		path: '/login',
		name: 'login',
		meta: { layout: 'auth-layout' },
		component: () => import('../views/Login.vue')
	},
	{
		path: '/register',
		name: 'register',
		meta: { layout: 'auth-layout' },
		component: () => import('../views/Register.vue')
	},
	{
		path: '/edit',
		name: 'editUser',
		meta: { layout: 'main-layout', auth: true },
		component: () => import('../views/EditUser.vue')
	},
	{
		path: '/create',
		name: 'createUser',
		meta: { layout: 'main-layout', auth: true },
		component: () => import('../views/CreateUser.vue')
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
