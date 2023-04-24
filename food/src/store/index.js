import { createStore } from 'vuex'
import axiosClient from '../axios'
const store = createStore({
    state :{
        user:{
            data: {
                
            },
            token :  sessionStorage.getItem('TOKEN')
        }
    },
    mutations :{
        setUser(state, user){
            state.user.data = user.user;
            state.user.token = user.token;
            sessionStorage.setItem('TOKEN', user.token)
        }
    },
    actions :{
        register({commit}, user){
            return axiosClient.post('/register', user)
            .then((data) => {
                commit('setUser', data)
                return data
                })
        },
        login({commit}, user){
           return axiosClient.post('/login', user)
           .then((data) => {
               commit('setUser', data)
               return data;
               })
        },
        
    },

    getters :{}

})
export default store