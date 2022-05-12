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
        },
        username:getCookie("username"),
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
                else if(error.response.status === 409){
                    dispatch("error", "Username already exists");
                }
            }
        },
        async login({ commit, dispatch }, userLogin) {
            try {
                const response = await axios.post("http://localhost:8085/login", userLogin);
                console.log(response);
                let username = userLogin.username;
                if (response.status === 200) {
                    dispatch("success", "Login success");
                    commit("SET_LOGIN", response.data);
                    setCookie("username",username);
                    dispatch("getAllTestSuite");
                    //window.location.href = '/index';

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
        SET_LOGIN(state, data) {
            state.user = user;
            setCookie("user", data, 1);

        },
        SET_LOGOUT(state) {
            state.user = null;
            removeCookie("user");
            removeCookie("username")
        },
    }
}
export default user;