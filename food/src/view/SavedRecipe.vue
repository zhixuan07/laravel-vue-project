<template>
  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 p-12 sm:p-4">
    <div v-for="food in recipe" :key="food.id" class="p-10 relative">
        <a class="absolute top-0 right-0 cursor-pointer p-6" @click="removeRecipe(food.id)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
</svg>
</a> 
      <div class="flex flex-col shadow-md border-gray-100 ">
        
        <div class=" ">
            <img
          class="h-60 w-full object-cover rounded-md"
          :src="food.recipe_image"
          alt="N / A"
        />
       

        </div>
        
        <div class="h-fit-content w-full pl-4 pt-4 pr-2">
          <h1 class="text-lg font-semibold">{{ food.recipe_name }}</h1>
          <div class="flex justify-start gap-10">
            
          </div>

          <div class=" flex justify-between items-center w-full mt-4 sm:text-xs md:text-sm lg:text-sm">
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2 mb-2 sm:px-3 sm:py-3 "
              >#{{ food.recipe_category }}</span
            >
            <div class="flex sm:text-xs md:text-sm lg:text-sm ">
                <a class="text-indigo-500  cursor-pointer sm:hidden"  @click="openInstruction(food)" > View Instructions</a>
                <a class="text-indigo-500  cursor-pointer"  @click="openInstruction(food)"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M10.21 14.77a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
              </a>
                
                
                
                
                    
            </div>
            <Teleport to="body">
        <div
          v-if="isOpen"
          class="fixed inset-0 flex items-center justify-center h-full bg-gray-400 bg-opacity-50"
        >
          <InstructionModal
            :recipe_id="food.recipe_id"
            :recipe_instruction="food.recipe_instruction"
            :recipe_ingredient="ingredient"
            @close="closeInstruction"
          />
        </div>
      </Teleport>
            

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "@vue/reactivity";
import { onMounted,ref } from "vue";
import store from "../store";
import axiosFoodClient from "../axiosFoodClient";
import InstructionModal from '../components/InstructionModal.vue'
const isOpen = ref(false);
const ingredient = ref([]);
import useRecipe from '../recipe';
const {showRecipe,recipe,deleteRecipe} = useRecipe();

onMounted(async() => {
  

    showRecipe();
  
    return recipe
  
  
});

const removeRecipe = (foodId) => {
  deleteRecipe(foodId);
  
};

const openInstruction = async (food) => {
  document.body.classList.add("overflow-hidden");
   let response = await axiosFoodClient.get(`/lookup.php?i=${food.recipe_id}`);
  
  ingredient.value = response.data.meals[0];
  isOpen.value = true;

};
const closeInstruction = () => {
  document.body.classList.remove("overflow-hidden");
  isOpen.value = false;
};

</script>
