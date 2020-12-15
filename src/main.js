import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

import $firebase from './firebase/index';

import './scss/main.scss'

Vue.prototype.$firebase = $firebase; // add firebase to global environment

let app;

$firebase.auth.onAuthStateChanged((user) => {
    if(!app) {
      	app = new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app')
    }
})