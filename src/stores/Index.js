import Vuex from 'vuex'
import user from './modules/User.js';
import alert from './modules/Alert.js';
import testsuite from './modules/Testsuite.js';
import config from './modules/Config.js';
import regression from './modules/Regression.js';
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
