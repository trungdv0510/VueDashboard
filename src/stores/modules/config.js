import axios from 'axios';
import { configRegresstion } from '@/utils/contains.js';
const config = {
    state: {
        configRegression: false,
        configTestScript: false,
        configRegressValue: null
    },
    getters: {
        configRegression: state => state.configRegression,
        configTestScript: state => state.configTestScript,
        configRegressValue: state => state.configRegressValue
    },
    actions: {
        async updateConfig({ commit, dispatch }, configUpdate) {
            try {
                const response = await axios.post("/config/update", configUpdate);
                if (response.status === 200) {
                    commit("SET_VALUE_REGRESSION", response.data);
                }
            } catch (error) {
                dispatch("error", "Server error please try later");
            }
        },
        async getConfig({ commit, dispatch }, configName) {
            try {
                let url = `/config?configName=${configName}`;
                const response = await axios.get(url);
                console.log(response);
                if (response.status === 200) {
                    commit("SET_VALUE_REGRESSION", response.data);
                }
            } catch (error) {
                dispatch("error", "Server error please try later");
            }
        }
    },
    mutations: {
        SET_VALUE_REGRESSION(state, data) {
            if (data == configRegresstion.configValueNo) {
                state.configRegressValue = false;
            }
            else if(data == configRegresstion.configValueYes) {
                state.configRegressValue = true;
            }
        },

    }
}
export default config;