<template>
  <div
    class=" z-0 bg-theme relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
    style="background-image: url('/src/assets/background.jpeg'); height: 500px"
  >
    <div
      class="absolute z-0 bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
      style="background-color: rgba(0, 0, 0, 0.6)"
    >
      <div class="flex flex-col h-full w-full justify-center items-center">
        <div class="m-3">
          <h1 class="text-4xl font-bold text-white">Food Recipes</h1>
        </div>
        <div class="w-full">
          <input
            type="text"
            class="bg-transparent border-2 border-white rounded-lg m-3 py-2 px-4 text-white w-1/2"
            v-model="recipeName"
            placeholder="Search for food"
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

  <div class="">
    <div class="text-3xl flex justify-center m-10 font-bold">
      <h1>Latest Recipes</h1>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 p-20 h-40 sm:p-12 "
    >
      <div
        v-for="item of recipe"
        :key="item.idMeal"
        class="bg-white shadow-md rounded-md"
      >
        <img
          class="h-60 w-full object-cover rounded-md"
          :src="item.strMealThumb"
          :alt="N / A"
        />
        <div class="h-40">
          <div class=" pl-3 pt-2">
            <p class="text-md font-bold">{{ item.strMeal }}</p>
          </div>

          <div class="flex justify-end mt-16 mr-3">
            <button
              class="absolute h-10 px-5 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100"
              @click="openModal(item)"
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
          <modal
            :name="modalInfo.strMeal"
            :instruction="modalInfo.strInstructions"
            :ingredient="modalInfo"
            @close="closeModal"
          />
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import Modal from "../components/Modal.vue";
import axiosFoodClient from "../axiosFoodClient";
import { computed } from "@vue/reactivity";

const router = useRouter();
const isOpen = ref(false);
const modalInfo = ref(null);
const recipeName = ref(null);
const recipe = ref([]);
const searchRecipe = () => {
  router.push({ name: "recipe", params: { recipeName: recipeName.value } });
};

onMounted(() =>
  axiosFoodClient
    .get(`latest.php`)
    .then(({ data }) => (recipe.value = data.meals.slice(0,9)))
);



const openModal = (item) => {
  isOpen.value = true;
  document.body.classList.add("overflow-hidden");
  console.log(item.idMeal);
  axiosFoodClient.get(`lookup.php?i=${item.idMeal}`).then(({ data }) => {
    modalInfo.value = data.meals[0];
  });
  console.log(modalInfo);
};
const closeModal = () => {
  isOpen.value = false;
  document.body.classList.remove("overflow-hidden");
};
</script>
