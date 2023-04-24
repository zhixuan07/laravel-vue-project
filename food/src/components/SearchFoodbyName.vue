<template>
    <div class="flex justify-center mt-3 text-2xl font-semibold">
      <p>Menu</p>
    </div>
  
    <div class="flex justify-center m-3 gap-3">
      <input class="border shadow appearance-none w-2/5 h-10" type="text" v-model="searchName" />
      <button
        class="border shadow appearance-none w-20 rounded-lg hover:bg-purple-700 hover:text-white"
        @click="search2"
      >
        Search
      </button>
    </div>
  
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      <div v-for="item of food" :key="item.idMeal" class="bg-white shadow-lg rounded-md">
        <img class="h-60 w-full object-cover rounded-md" :src="item.strMealThumb" :alt="N / A" />
        <div>
          <div class="m-3">
            <p class="text-md font-bold ">{{ item.strMeal }}</p>
            <p>Category:{{ item.strCategory }}</p>
          </div>
          
          <div class="flex justify-end m-3">
            <button class="bg-indigo-600 rounded-lg w-20 h-10 text-white" @click="openModal(item)">
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
  
    <!---<Suspense>
           <template #default>
              
          </template> 
          <template #fallback>
              <div class="flex justify-center items-center h-screen">
                  <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
              </div>
          </template>
      </Suspense> -->
  </template>
  
  <script setup>
  import { computed } from '@vue/reactivity'
  import { onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  import Modal from './Modal.vue'
  const store = useStore()
  const searchName = ref(null)
  const isOpen = ref(false)
  const modalInfo = ref(null)
  const ingredients = ref({})
  
  const openModal = (item) => {
    isOpen.value = true
    modalInfo.value = item
    document.body.classList.add('overflow-hidden')
    console.log(modalInfo)
  }
  const closeModal = () => {
    isOpen.value = false
    document.body.classList.remove('overflow-hidden')
  }
  
  const food = computed(() => store.state.foodByName)
  
  const filteredIngredients = computed(() => {
    for (const key in modalInfo.value) {
      if (key.startsWith('strIngredient')) {
        ingredients[key] = modalInfo.value[key]
      }
    }
  })
  const search2 = async () => {
    try {
      await store.dispatch('searchFoodByName', searchName.value)
    } catch (err) {
      console.log(err)
    }
  }
  </script>
  