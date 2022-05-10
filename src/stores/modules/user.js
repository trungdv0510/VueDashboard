import axios from 'axios'
import { removeCookie, setCookie, getCookie } from "@/utils/cookiesUtils.js";
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
            email:"",
            username:"",
            password:"",
            permission:"",
            roles:""
        }
    },
    getters: {
        userList: state => state.userList,
        user: state => state.user,
        userDto: state => state.userDto
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
                else if(error.response.status === 409){
                    dispatch("error", "Username already exists");
                }
            }
        },
        async login({ commit, dispatch }, userLogin) {
            try {
                const response = await axios.post("http://localhost:8085/login", userLogin);
                console.log(response);
                if (response.status === 200) {
                    dispatch("success", "Login success");
                    commit("SET_LOGIN", response.data, userLogin.username);
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
                await axios.post("http://localhost:8085/logout").then(commit("SET_LOGOUT"));
            }
            catch (e) {
                console.log(e);
            }

        }
    },

    mutations: {
        SET_LOGIN(state, data, user) {
            state.user = userLogin;
            setCookie("user", data, 1);
            localStorage.setItem("user", user);
            window.location.href = '/index'

        },
        SET_LOGOUT(state) {
            state.user = null;
            removeCookie("user");
        },
    }
}
export default user;