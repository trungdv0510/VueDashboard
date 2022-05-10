import Vuex from 'vuex'
import user from './modules/user.js';
import alert from './modules/alert.js';
const storeData = {
	modules: {
		user,
		alert
	}
}

const store = new Vuex.Store(storeData)

export default store