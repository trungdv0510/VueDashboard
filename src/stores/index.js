import Vuex from 'vuex'
import user from './modules/user.js';
const storeData = {
	modules: {
		user
	}
}

const store = new Vuex.Store(storeData)

export default store