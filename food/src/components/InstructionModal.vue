<template>
<div class="max-w-2xl h-3/5 p-6 bg-white rounded-md shadow-xl overflow-auto">
    <div class="p-3">
        <h1 class="font-semibold font-serif m-3"> Instruction of cooking Recipe</h1>
       
        <p>{{ food.recipe_instruction }}</p>
    </div>
  
    <div class="flex flex-row justify-start p-4 gap-10 mt-2">
        <div class="mr-3">
          <h2 class="text-xl font-semibold">Ingredients</h2>
          <ul>
            <template v-for="(el, ind) of new Array(20)">
              <li v-if="food.recipe_ingredient[`strIngredient${ind + 1}`]">
                {{ ind + 1 }} : {{ food.recipe_ingredient[`strIngredient${ind + 1}`] }}
              </li>
            </template>
          </ul>
        </div>

        <div>
          <h2 class="text-xl font-semibold">Measures</h2>
          <ul>
            <template v-for="(el, ind) of new Array(20)">
              <li v-if="food.recipe_ingredient[`strMeasure${ind + 1}`]">
                {{ food.recipe_ingredient[`strMeasure${ind + 1}`] }}
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="flex justify-end "> 
        <button class="px-6 py-2 text-blue-800 border border-blue-600 rounded" @click="$emit('close')">Close</button>
    </div>
    
</div>
</template>

<script setup>
import { defineEmits, onMounted } from 'vue';
import axiosFoodClient from '../axiosFoodClient';
const food =defineProps({
    recipe_id: String,
    recipe_instruction: String,
    recipe_ingredient : Array
 
  
  
})


defineEmits('close')

</script>