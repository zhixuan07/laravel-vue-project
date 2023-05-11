import { createStore } from 'vuex'
import axiosClient from '../axios'
import axiosFoodClient from '../axiosFoodClient';
function updateLocalStorage(savedRecipe) {
   
    localStorage.setItem('savedRecipe', JSON.stringify(savedRecipe))
  }
const store = createStore({
    state :{
        user:{
            data: {},
            token :  sessionStorage.getItem('TOKEN')
        },
        foodByName:[],
        foodByCategory: [],
        savedRecipe:[]
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
          },
        addRecipe(state, recipe) {

            state.savedRecipe.push(recipe)
            updateLocalStorage(state.savedRecipe)
          },
        setSavedRecipe(state, savedRecipe) {
            
            state.savedRecipe = savedRecipe
            updateLocalStorage(state.savedRecipe)
            
           
          },
          removeSavedRecipe(state, recipeId) {
            state.savedRecipe = state.savedRecipe.filter(savedRecipe => savedRecipe.id !== recipeId);
            updateLocalStorage(state.savedRecipe)
          },
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
        },
        addRecipe({commit,state}, recipe) {
            
            const recipeIndex = state.savedRecipe.findIndex(savedRecipe => savedRecipe.id === recipe.id)
            if (recipeIndex === -1) {
              commit('addRecipe', recipe);
              localStorage.setItem('savedRecipe', JSON.stringify(state.savedRecipe));
              return true;
            } else {
              return false;
            }
          },
        loadSavedRecipe({commit}) {
            const savedRecipe = localStorage.getItem('savedRecipe');
            if (savedRecipe) {
              commit('setSavedRecipe', JSON.parse(savedRecipe));
            }else{
              alert('No saved recipe')
            }
          },
          removeSavedRecipe({commit,state}, recipeId) {
            const recipeIndex = state.savedRecipe.findIndex(savedRecipe => savedRecipe.id === recipeId)
            if (recipeIndex !== -1) {
              commit('removeSavedRecipe', recipeId);
  
              console.log(state.savedRecipe)
              alert('Recipe removed')
              }else{
                console.log('error')
                return false
              }
            }
          ,
        
    },

    getters :{

    }

})
export default store