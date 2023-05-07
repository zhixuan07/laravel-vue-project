<template>
  <div
    class="bg-theme relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
    style="background-image: url('/src/assets/background.jpeg'); height: 500px"
  >
    <div
      class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
      style="background-color: rgba(0, 0, 0, 0.6)"
    >
      <div class="flex flex-col h-full w-full justify-center items-center">
        <div class="m-3">
          <h1 class="text-4xl font-bold text-white">Food Recipes</h1>
        </div>
        <div class="w-full ">
          <input
            type="text"
            class="bg-transparent border-2 border-white rounded-lg m-3 py-2 px-4 text-white w-1/2"
            v-model="recipeName"
            placeholder="Search for food"
          />
          <button
            class="bg-white rounded-lg py-2 px-4 text-black h-15 w-30"
            @click="searchRecipe"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const recipeName = ref(null);
const searchRecipe = () => {
  router.push({ name: "recipe", params: { recipeName: recipeName.value } });
};
</script>
