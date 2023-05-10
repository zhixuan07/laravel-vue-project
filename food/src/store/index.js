import { createStore } from 'vuex'
import axiosClient from '../axios'
import axiosFoodClient from '../axiosFoodClient';
const store = createStore({
    state :{
        user:{
            data: {},
            token :  sessionStorage.getItem('TOKEN')
        },
        foodByName:[],
        foodByCategory: []
    },
    mutations :{
        setUser(state, userData){
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token)
        },
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            sessionStorage.removeItem("TOKEN");
          },
        set_foodByName(state, payload) {
            state.foodByName = payload
          },
        set_foodByCategory(state, payload) {
            state.foodByCategory = payload
          }
    },
    actions :{
        register({commit}, user){
            return axiosClient.post('/register', user)
           .then(({data}) => {
               commit('setUser', data)
               return data;
               })
        },
        login({commit}, user){
           return axiosClient.post('/login', user)
           .then(({data}) => {
               commit('setUser', data)
               console.log(data)
               return data;
               
               })
        },
        logout({commit},user) {
            return axiosClient.post('/logout')
              .then(response => {
                commit('logout')
                return response;
              })
        },
        updateAccount({commit}, user){
            return axiosClient.patch('/UserAccount', user)
            .then(({data}) => {
                commit('setUser', data)
                return data;
                })
        },
        async searchFoodByName(context, food) {
          const response = await axiosFoodClient.get(`search.php?s=${food}`)
          context.commit('set_foodByName', response.data.meals)
        },
        async searchFoodByCategory(context, food) {
          const response = await axiosFoodClient.get(`filter.php?c=${food}`)
          context.commit('set_foodByCategory', response.data.meals)
        }
        
    },

    getters :{}

})
export default store