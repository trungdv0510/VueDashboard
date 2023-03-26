import axios from 'axios'
import { removeCookie, setCookie, getCookie } from "@/utils/CookiesUtils.js";
import {constanst} from '@/utils/Contains.js';
const userLogin = getCookie("user");
let isLogin = false;
if (userLogin) {
    isLogin = true;
}
const user = {
    state: {
        userList: [],
        user: userLogin,
        isLogin: isLogin,
        userDto: {
            email: "",
            username: "",
            password: "",
            permission: "",
            roles: ""
        },
        username: getCookie("username"),
    },
    getters: {
        userList: state => state.userList,
        user: state => state.user,
        userDto: state => state.userDto,
        username: state => state.username
    },
    actions: {
        //write API to get value 
        async addUser({ dispatch }, newUers) {
            try {
                await axios.post("admin/user", newUers).then(response => {
                    if (response.status === 200) {
                        dispatch("success", "Insert user success");
                    }
                }
                );
            }
            catch (error) {
                console.log(error);
                console.log(error.response.status);
                if (error.response.status === 403) {
                    dispatch("error", "You are not authorized to perform this function");
                }
                else if (error.response.status === 409) {
                    dispatch("error", "Username already exists");
                }
            }
        },
        async login({ commit, dispatch }, userLogin) {
            try {
                const response = await axios.post(`${constanst.pathServer}login`, userLogin);
                let username = userLogin.username;
                if (response.status === 200) {
                    dispatch("success", "Login success");
                    commit("SET_LOGIN", response.data);
                    setCookie(constanst.username, username,1);
                    window.location.href = '/index';

                }
                else {
                    dispatch("error", "Username or password is not correct");
                }
            } catch (error) {
                dispatch("error", "Username or password is not correct");
                console.log(error);
            }
        },
        async logout({ commit }) {
            try {
                await axios.get(`${constanst.pathServer}api/logout`).then(commit("SET_LOGOUT"));
            }
            catch (e) {
                console.log(e);
            }

        }
    },

    mutations: {
        SET_LOGIN(state, data) {
            state.user = user;
            setCookie(constanst.Authorization, data, 1);

        },
        SET_LOGOUT(state) {
            state.user = null;
            removeCookie(constanst.Authorization);
            removeCookie(constanst.username);
            window.location.href = '/'
        },
    }
}
export default user;
