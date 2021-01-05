import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from './auth';
import users from './users';

export default new Vuex.Store({
	modules: {
		auth,
		users,
	},
})
