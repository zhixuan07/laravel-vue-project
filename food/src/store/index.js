import { createStore } from "vuex";
import axiosClient from "../axios";
import axiosFoodClient from "../axiosFoodClient";

function updateLocalStorage(savedRecipe) {
    localStorage.setItem("savedRecipe", JSON.stringify(savedRecipe));
}
function updateLocalStorageUser(usersDetails) {
  localStorage.setItem("setUsers", JSON.stringify(usersDetails));// change json object to json string 
}

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        },
        foodByName: [],
        foodByCategory: [],
        savedRecipe: [],
        usersDetails: [],
    },
    mutations: {
        setUser: (state, user) => {
            state.user.data = user;
        },
        setToken: (state, token) => {
            state.user.token = token;
            sessionStorage.setItem("TOKEN", token);
        },
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            sessionStorage.removeItem("TOKEN");
        },
        set_foodByName(state, payload) {
            state.foodByName = payload;
        },
        set_foodByCategory(state, payload) {
            state.foodByCategory = payload;
        },
        addRecipe(state, recipe) {
            state.savedRecipe.push(recipe);
            updateLocalStorage(state.savedRecipe);
        },
        setUsers(state, users) {
            state.usersDetails = users; 
            updateLocalStorageUser(state.usersDetails);
        },
        setSavedRecipe(state, savedRecipe) {
            state.savedRecipe = savedRecipe;
            updateLocalStorage(state.savedRecipe);
        },
        removeSavedRecipe(state, recipeId) {
            state.savedRecipe = state.savedRecipe.filter(
                (savedRecipe) => savedRecipe.id !== recipeId
            );
            updateLocalStorage(state.savedRecipe);
        },
    },
    actions: {
        register({ commit }, user) {
            return axiosClient.post("/register", user).then(({ data }) => {
                commit("setUser", data);
                return data;
            });
        },
        login({ commit, state }, user) {
            return axiosClient.post("/login", user).then(({ data }) => {
                commit("setUser", data.user);
                commit("setToken", data.token);
                commit("setUsers", data.user);
                localStorage.setItem(
                    "setUsers",
                    JSON.stringify(state.usersDetails)
                );
                return data;
            });
        },
        logout({ commit }, user) {
            return axiosClient.post("/logout").then((response) => {
                commit("logout");
                localStorage.clear("foodRecipe");
                return response;
            });
        },
        updateAccount({ commit }, user) {
            commit("setUser", user);
            console.log(user);
        },
        async searchFoodByName(context, food) {
            const response = await axiosFoodClient.get(`search.php?s=${food}`);
            context.commit("set_foodByName", response.data.meals);
        },
        async searchFoodByCategory(context, food) {
            const response = await axiosFoodClient.get(`filter.php?c=${food}`);
            context.commit("set_foodByCategory", response.data.meals);
        },
        addRecipe({ commit, state }, recipe) {
            const recipeIndex = state.savedRecipe.findIndex(
                (savedRecipe) => savedRecipe.id === recipe.id
            );
            if (recipeIndex === -1) {
                commit("addRecipe", recipe);
                localStorage.setItem(
                    "savedRecipe",
                    JSON.stringify(state.savedRecipe)
                );
                return true;
            } else {
                return false;
            }
        },
        loadSavedRecipe({ commit }) {
            const savedRecipe = localStorage.getItem("savedRecipe");
            if (savedRecipe) {
                commit("setSavedRecipe", JSON.parse(savedRecipe));
            } else {
                alert("No saved recipe");
            }
        },
        removeSavedRecipe({ commit, state }, recipeId) {
            const recipeIndex = state.savedRecipe.findIndex(
                (savedRecipe) => savedRecipe.id === recipeId
            );
            if (recipeIndex !== -1) {
                commit("removeSavedRecipe", recipeId);

                console.log(state.savedRecipe);
                alert("Recipe removed");
            } else {
                console.log("error");
                return false;
            }
        },
        loadUserDetails({ commit }) {
            const userDetails = localStorage.getItem("setUsers");
            if (userDetails) {
                commit("setUsers", JSON.parse(userDetails));
            } else {
                alert("No user");
            }
        },
       
    },

    getters: {
        user(state) {
            return state.user.data;
        },
    },
});

export default store;