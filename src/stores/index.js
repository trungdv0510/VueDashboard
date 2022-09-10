import Vuex from 'vuex'
import user from './modules/user.js';
import alert from './modules/alert.js';
import testsuite from './modules/testsuite.js';
import config from './modules/config.js';
import regression from './modules/regression.js';
const storeData = {
	modules: {
		user,
		alert,
		testsuite,
		config,
		regression
	}
}

const store = new Vuex.Store(storeData)

export default store