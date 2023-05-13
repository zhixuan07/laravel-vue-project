<script setup>
import Modal from "./Modal.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";
import axiosFoodClient from "../axiosFoodClient";
const store = useStore();
const route = useRoute();
const isOpen = ref(false);
const modalInfo = ref(null);

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

const food = computed(() => store.state.foodByCategory);

onMounted(() => {
  store.dispatch("searchFoodByCategory", route.params.category);
  
});
</script>

<template>
  <div>
    <div class="flex justify-center m-3">
      <h1 class="text-4xl">{{ route.params.category }}</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      <div
        v-for="item of food"
        :key="item.idMeal"
        class="bg-white shadow-lg rounded-md"
      >
        <img
          class="h-60 w-full object-cover rounded-md"
          :src="item.strMealThumb"
          alt="N / A"
        />
        <div>
          <div class="m-3">
            <p class="text-md font-bold">{{ item.strMeal }}</p>
          </div>

          <div class="flex justify-end m-3">
            <button
              class="bg-indigo-600 rounded-lg w-20 h-10 text-white"
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
    <p v-if="!food.length">Empty</p>
  </div>
</template>
