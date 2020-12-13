import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../views/Home.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		meta: { layout: 'main-layout' },
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
		meta: { layout: 'main-layout' },
		component: () => import('../views/EditUser.vue')
	},
	{
		path: '/create',
		name: 'createUser',
		meta: { layout: 'main-layout' },
		component: () => import('../views/CreateUser.vue')
	},

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
