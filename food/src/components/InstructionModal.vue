<template>
<div class="max-w-2xl h-3/5 p-6 bg-white rounded-md shadow-xl overflow-auto">
    <div class="p-3">
        <h1 class="font-semibold font-serif m-3"> Instruction of cooking Recipe</h1>
        <p>{{ food.instruction }}</p>
    </div>
    <div class="flex justify-end "> 
        <button class="px-6 py-2 text-blue-800 border border-blue-600 rounded" @click="$emit('close')">Close</button>
    </div>
    
</div>
</template>

<script setup>
import { defineEmits } from 'vue';
const food =defineProps({
    
  instruction: String,
  
})
defineEmits('close')

</script>