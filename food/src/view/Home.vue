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
            placeholder="Search for recipe"
          />
          <button
            class="bg-white rounded-lg py-2 px-4 text-black h-15 w-30 focus:shadow-outline transition-colors duration-150 hover:bg-gray-200 "
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
      <h1 class="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-3xl font-black"
      >Latest Recipes
    </h1>
  
    </div>
    <div
      class="  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 p-20 h-fit  sm:p-12 "
    >
   
      <div
        v-for="item of recipe"
        :key="item.idMeal"
        class="bg-white shadow-md rounded-md relative"
      >
    
        <img
          class="h-60 w-full object-cover rounded-md"
          :src="item.strMealThumb"
          alt="N / A"
        />
        <div class="h-fit">
          <div class=" pl-3 pt-2 m-1">
            <p class="text-md font-semibold">{{ item.strMeal }}</p>
          </div>

          <div class="flex justify-between mt-16 mb-1 pl-2 pr-2 ">
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
            :recipe_id="modalInfo.idMeal"
            :recipe_name="modalInfo.strMeal"
            :recipe_instruction="modalInfo.strInstructions"
            :recipe_ingredient="modalInfo"
            :recipe_image="modalInfo.strMealThumb"
            :recipe_category="modalInfo.strCategory"
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
  if(sessionStorage.getItem('TOKEN') === null){
    isOpen.value = false;
    document.body.classList.remove("overflow-hidden");
    alert('please login to view recipe')
    router.push('/login')
    
  }else{
    isOpen.value = true;
  document.body.classList.add("overflow-hidden");
  axiosFoodClient.get(`lookup.php?i=${item.idMeal}`).then(({ data }) => {
    modalInfo.value = data.meals[0];
  });
  }

  
  
};
const closeModal = () => {
  isOpen.value = false;
  document.body.classList.remove("overflow-hidden");
};

</script>
