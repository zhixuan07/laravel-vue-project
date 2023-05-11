<template>
  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 p-12">
    <div v-for="food in recipe" :key="food.id" class="p-10">
      <div class="flex flex-col shadow-md border-gray-100">
        <img
          class="h-60 w-full object-cover rounded-md"
          :src="food.img"
          alt="N / A"
        />
        <div class="h-fit-content pl-4 pt-4 pr-14">
          <h1 class="text-lg font-semibold">{{ food.name }}</h1>
          <div class="flex justify-start gap-6">
            <p class="text-md font-sana">Ingredient</p>
            <h2 class="text-md font-sana">Measures</h2>
          </div>

          <div class="flex justify-start gap-10">
            <ul>
              <template v-for="(el, ind) of new Array(20)">
                <li v-if="food.ingredient[`strIngredient${ind + 1}`]">
                  {{ food.ingredient[`strIngredient${ind + 1}`] }}
                </li>
              </template>
            </ul>

            <ul>
              <template v-for="(el, ind) of new Array(20)">
                <li v-if="food.ingredient[`strMeasure${ind + 1}`]">
                  {{ food.ingredient[`strMeasure${ind + 1}`] }}
                </li>
              </template>
            </ul>
          </div>
          <div class="mt-3">
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >#{{ food.category }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import store from "../store";
const recipe = computed(() => store.state.savedRecipe);
onMounted(() => {
  store.dispatch("loadSavedRecipe");
  console.log(store.state.savedRecipe);
  console.log(recipe.value);
});
</script>
