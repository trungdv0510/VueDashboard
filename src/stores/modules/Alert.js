const alert = {
    state: {
        type: null,
        message: null
    },
    getters:{
        type:state=>state.type,
        message:state=>state.message
    },
    actions: {
        success({ commit }, message) {
            commit('success', message);
        },
        error({ commit }, message) {
            commit('error', message);
        },
        clear({ commit }) {
            commit('clear');
        }
    },
    mutations: {
        success(state, message) {
            state.type = 'alert-success';
            state.message = message;
        },
        error(state, message) {
            state.type = 'alert-danger';
            state.message = message;
        },
        clear(state) {
            state.type = null;
            state.message = null;
        }
    }
}
export default alert;