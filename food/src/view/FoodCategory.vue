<script setup>
import axiosFoodClient from '../axiosFoodClient'
import { onMounted, ref } from 'vue'

import { useRouter } from 'vue-router'

const foodList = ref([])
const router = useRouter()


const openCategoryItem = (item) => {
   router.push({ name: 'categoryItem', params: { category: item.strCategory } })
}

onMounted(() => {
  axiosFoodClient.get('categories.php').then(({ data }) => {
    foodList.value = data.categories
  })
})
</script>

<template>
  <div>
    <div class="flex justify-center mt-6 mb-6 font-semibold text-2xl">
        <h1>Category</h1>
    </div>
    

    <div>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        <div v-for="item of foodList" :key="item.idCategory" class="bg-white shadow-lg rounded-md">
          <img
            class="h-60 w-full object-cover rounded-md"
            :src="item.strCategoryThumb"
            :alt="N / A"
          />
          <div>
            <div class="m-3">
              <p class="text-md font-bold">{{ item.strCategory }}</p>
            </div>

            <div class="flex justify-end m-3">
              <button
                class="bg-indigo-600 rounded-lg w-20 h-10 text-white"
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
