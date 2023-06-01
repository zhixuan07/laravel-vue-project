import { computed, ref } from "vue";
import axiosClient from "./axios";
import store from "./store";
import router from "./router";
function useRecipe() {
    const recipe = ref(); //from api call data
    const errors = ref("");
    const recipeString = localStorage.getItem("savedRecipe"); // JSON string
    const recipeObject = JSON.parse(recipeString); // convert to JSON object

    const showRecipe = async () => {
        
        let response = await axiosClient.get(`/recipe`);
        console.log(response.data);
        recipe.value = response.data;
    };

    const storeRecipe = async (data) => {
        errors.value = "";

        try{
            await axiosClient.post(`/recipe`, data);
            
            alert("Recipe Added");
        }
        catch(e){   
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + " ";
                }
            }
        }
    };

    const deleteRecipe = async (id) => {
        try{
            await axiosClient.delete(`/recipe/${id}`);
            router.push('/savedRecipe')
            alert("Recipe Deleted");
        }
        catch(e){
            console.log(e);
        }
    };

    return { recipe, errors, showRecipe, storeRecipe,deleteRecipe };
}
export default useRecipe;
