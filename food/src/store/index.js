import { createStore } from 'vuex'
import axiosClient from '../axios'
import axiosFoodClient from '../axiosFoodClient';
const store = createStore({
    state :{
        user:{
            data: {},
            token :  sessionStorage.getItem('TOKEN')
        },
        foodByName:[]
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
               return data;
               })
        },
        logout({commit}) {
            return axiosClient.post('/logout')
              .then(response => {
                commit('logout')
                return response;
              })
        },
        async searchFoodByName(context, food) {
          const response = await axiosFoodClient.get(`search.php?s=${food}`)
          context.commit('set_foodByName', response.data.meals)
        }
        
    },

    getters :{}

})
export default store