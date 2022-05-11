import Vuex from 'vuex'
import user from './modules/user.js';
import alert from './modules/alert.js';
import testsuite from './modules/testsuite.js';
const storeData = {
	modules: {
		user,
		alert,
		testsuite
	}
}

const store = new Vuex.Store(storeData)

export default store