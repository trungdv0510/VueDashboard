import axios from 'axios'
import {removeCookie,setCookie} from "@/utils/localStorerage.js";
export const userServices = {
    login,
    logout,
    getAll
}
function login(user){
    return axios.post("url",user)
                .then(handleResponse)
                .then(user => {
                    if(user){
                        setCookie('user', user,2);
                    }
                });
}
function logout(){
    removeCookie("user");
}
function getAll(){
    return axios.get("url").then(handleResponse);
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return error;
        }

        return data;
    });
}
