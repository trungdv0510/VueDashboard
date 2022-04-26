import Vuex from 'vuex'
import user from './modules/user.js';
Vue.use(Vuex);
const storeData = {
	modules: {
		user
	}
}

const store = new Vuex.Store(storeData)

export default store