<template>
  <div>
    <div class="flex flex-col items-center justify-center py-2 ">
      <div class="flex flex-col items-center justify-center p-4">
        <h1 class="text-4xl font-bold">Account</h1>
        <p class="text-xl mt-3">Welcome to your profile page</p>

        <form @submit.prevent="saveAccount"  >
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6">
            <div class="md:col-span-3">
              <label

                for="first-name"
                class="block text-sm font-medium leading-6 text-gray-900"
                >First name</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  v-model="user.first_name"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="md:col-span-3">
              <label
                for="last-name"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Last name</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autocomplete="family-name"
                  v-model="user.last_name"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div class="md:col-span-4">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Password</label
              >
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="password"
                  v-model="user.password" 
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-opacity-50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="md:col-span-4">
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Email address</label
              >
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  v-model="user.email" disabled
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-300 bg-opacity-50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="md:col-span-3">
              <button
                class="rounded-lg bg-blue-500 h-8 w-full leading-6 text-white text-sm font-bold"
                type="submit"
                
              >
                Save Change
              </button>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "@vue/reactivity";
import { ref, onBeforeMount, onMounted } from "vue";
import useUser from "../user";
const {showUser,updateUser,user}  = useUser();



const saveAccount = async () => {
  if(user.password===""){
    alert("Password is required")
    return
  }else{
    await updateUser(user);
    
  }
  

};


onMounted(() => {
  
  showUser();
  return user
  
});
</script>
