<script setup>
import axiosFoodClient from "../axiosFoodClient";
import { onMounted, ref } from "vue";

import { useRouter } from "vue-router";

const foodList = ref([]);
const router = useRouter();

const openCategoryItem = (item) => {
  router.push({ name: "categoryItem", params: { category: item.strCategory } });
};

onMounted(() => {
  axiosFoodClient.get("categories.php").then(({ data }) => {
    foodList.value = data.categories;
  });
});
</script>

<template>
  <div
    class="z-0 bg-theme relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center sm:bg-fit"
    style="background-image: url('/src/assets/categoryBackground.jpeg'); height: 500px"
  >
    <div
      class="absolute z-0 bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
      style="background-color: rgba(0, 0, 0, 0.6)"
    >
      <div class="flex flex-col h-full w-full justify-center items-center">
        <div class="m-3">
          <h1 class="text-4xl font-bold text-white">Browse Food Recipes</h1>
        </div>
        <div class="w-full">
          <input
            type="text"
            class="bg-transparent border-2 border-white rounded-lg m-3 py-2 px-4 text-white w-1/2"
            v-model="recipeName"
            placeholder="Search for recipe"
          />
          <button
            class="bg-white rounded-lg py-2 px-4 text-black h-15 w-30 focus:shadow-outline transition-colors duration-150 hover:bg-indigo-500 hover:text-indigo-100"
            @click="searchRecipe"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="h-full p-6">
    <div>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 p-6">
        <div
          v-for="item of foodList"
          :key="item.idCategory"
          class="bg-grey-200 bg-opacity-30  shadow-md  border-1"
        >
          <img
            class="h-fit-content w-full object-fit rounded-lg border-1 border-gray-400 p-2"
            :src="item.strCategoryThumb"
            alt="N / A"
          />
          <div class="">
            <div class="ml-6 mt-1">
              <p class="text-md font-bold">{{ item.strCategory }}</p>
            </div>

            <div class="flex justify-end pr-3 pb-3">
              <button
                class="bg-indigo-600 rounded-lg w-20 h-10  text-white"
                @click="openCategoryItem(item)"
              >
                More Info
              </button>
            </div>
          </div>
        </div>
        <Teleport to="body">
          <div
            v-if="isOpen"
            class="fixed inset-0 flex items-center justify-center h-full bg-gray-400 bg-opacity-50"
          >
            <info-card
              :name="cardInfo.strMeal"
              :instruction="cardInfo.strInstructions"
              :ingredient="cardInfo"
              @close="closeModal"
            />
          </div>
        </Teleport>
      </div>
    </div>
  </div>
</template>
