<template>
  <div
    class=" z-0 bg-theme relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center sm:bg-fit"
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
      class="  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 p-20 h-full  sm:p-12 "
    >
   
      <div
        v-for="item of recipe"
        :key="item.idMeal"
        class="bg-white shadow-md rounded-md relative"
      >
      <a class="absolute top-0 right-0 cursor-pointer p-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
    </a>
        <img
          class="h-60 w-full object-cover rounded-md"
          :src="item.strMealThumb"
          alt="N / A"
        />
        <div class="h-40">
          <div class=" pl-3 pt-2">
            <p class="text-md font-semibold">{{ item.strMeal }}</p>
          </div>

          <div class="flex justify-between mt-20  pl-2 pr-2 ">
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 sm:text-xs text-sm font-semibold text-gray-700 mr-2 mb-2 sm:px-3 sm:py-3 "
              >#{{ item.strCategory }}</span
            >
            <button
              class=" h-10 px-5 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100"
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
            :id="modalInfo.idMeal"
            :name="modalInfo.strMeal"
            :instruction="modalInfo.strInstructions"
            :ingredient="modalInfo"
            :img="modalInfo.strMealThumb"
            :category="modalInfo.strCategory"
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
import { useStore } from "vuex";
const store = useStore();

const router = useRouter();
const isOpen = ref(false);
const modalInfo = ref(null);
const recipeName = ref(null);
const recipe = ref([]);
const user  = store.state.user
const searchRecipe = () => {
  if(recipeName.value === null || recipeName.value === ""){
    alert('please enter a recipe name')
    return
  };
  router.push({ name: "recipe", params: { recipeName: recipeName.value } });
};

onMounted(() =>
  
  axiosFoodClient
    .get(`latest.php`)
    .then(({ data }) => (recipe.value = data.meals.slice(0,9)))
    .catch((err) => console.log(err))
  
);


const openModal = (item) => {
  console.log(user)
  isOpen.value = true;
  document.body.classList.add("overflow-hidden");
  axiosFoodClient.get(`lookup.php?i=${item.idMeal}`).then(({ data }) => {
    modalInfo.value = data.meals[0];
  });
  
};
const closeModal = () => {
  isOpen.value = false;
  document.body.classList.remove("overflow-hidden");
};
</script>
