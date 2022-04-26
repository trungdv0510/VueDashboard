const user = {
    state:{
        isAuthenticated:false,
        user:{
            username:'',
            password:''
        }
    },
    getters:{
        auth: state=>state.isAuthenticated,
        user: state=>state.user
    },
    actions:{

    },
    mutations:{
        SET_AUTH(state,isAuth){
            state.isAuthenticated = isAuth;
        },
        SET_USER(state,userLogin){
            state.user = userLogin;
            localStorage.setItem("user",user.username);
        }
    }
}
export default user;