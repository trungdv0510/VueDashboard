import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/stores/modules/user.js'
Vue.use(Vuex)

const storeData = {
	modules: {
        user
	}
}

const store = new Vuex.Store(storeData)

export default store