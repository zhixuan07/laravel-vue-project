import { ref } from "vue";
import axiosClient from "./axios";
import router from "./router";

function useRecipe() {
    const recipe = ref(); //from api call data
    const errors = ref("");
    const recipeString = localStorage.getItem("savedRecipe"); // JSON string
    const recipeObject = JSON.parse(recipeString); // convert to JSON object

    const showRecipe = async (id) => {
        
        let response = await axiosClient.get(`/recipes/user/${id}`);
        console.log(response.data);
        recipe.value = response.data.data;
    };

    const storeRecipe = async (userId, data) => {
        errors.value = "";
    
        try {
          await axiosClient.post(`/recipes/user/${userId}`, data);
          alert("Recipe Added");
          
        } catch (error) {
          if (error.response && error.response.status === 422) {
            for (const key in error.response.data.errors) {
              errors.value += error.response.data.errors[key][0] + " ";
            }
          }
        }
      };

    const deleteRecipe = async (id) => {
        try{
            await axiosClient.delete(`/recipe/${id}`);
            router.push('/savedRecipe')
            alert("Recipe Deleted");
            location.reload()
        }
        catch(e){
            console.log(e);
        }
    };

    return { recipe, errors, showRecipe, storeRecipe,deleteRecipe };
}
export default useRecipe;
