<template>
  <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
    <div
      @click="toggleNav"
      class="flex justify-end items-center mr-2 h-10 md:hidden"
    >
      <button
        type="button"
        class="text-white hover:text-indigo-600 focus:outline-none focus:text-indigo-400"
      >
        <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
          <path
            fill-rule="evenodd"
            d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
          ></path>
        </svg>
      </button>
    </div>
  </div>

  <nav
    :class="showMenu ? 'flex' : 'hidden'"
    class="flex-col p-2 text-white bg-purple-300 space-y-4 md:bg-gradient-to-r md:from-indigo-500 via-purple-500 md:to-pink-500 md:h-10 md:flex md:space-y-0 md:flex-row md:items-center md:justify-end md:space-x-10 md:mt-0"
  >
    <router-link
      to="/"
      class="transition ease-in-out delay-100 hover:-translate-y-0.5 hover:scale-200 hover:text-purple-700 duration-200"
      v-if="isLoggedIn"
      >Home</router-link
    >

    <router-link
      to="/category"
      class="transition ease-in-out delay-100 hover:-translate-y-0.5 hover:scale-200 hover:text-purple-700 duration-200"
      v-if="isLoggedIn"
      >Category</router-link
    >
    <div>
      <div class="relative" v-if="isLoggedIn">
        <!-- Dropdown toggle button -->
        <button
          @click="show = !show"
          id="dropdownHoverButton"
          data-dropdown-toggle="dropdownHover"
          data-dropdown-trigger="hover"
          class="flex items-center p-2 text-indigo-100 rounded-md "
        >
          <span
          
            class="transition ease-in-out delay-100 hover:-translate-y-0.5 hover:scale-200  hover:text-purple-700 duration-200 "
            >Profile</span
          >
          <svg
            class="w-5 h-5 text-indigo-100 dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Dropdown menu -->
        <div
          v-show="show"
          id="dropdownHover"
          class="absolute z-10 right-0 py-2 mt-2 bg-indigo-500 rounded-md shadow-xl w-44 sm:static"
        >
          <router-link
            to="/account"
            class="block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100"
          >
            Account
          </router-link>
          <router-link
            to=""
            class="block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100"
          >
            Saved Recipes
          </router-link>

          <a
            class="block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100"
            @click="handleSignOut"
            v-if="isLoggedIn"
          >
            Sign Out
          </a>
        </div>
      </div>
    </div>

    <router-link
      to="/register"
      class="transition ease-in-out delay-100 hover:-translate-y-0.5 hover:scale-200 hover:text-purple-700 duration-200"
      v-if="!isLoggedIn"
      >Sign up</router-link
    >
  </nav>
  <RouterView />
</template>

<script setup>
import { onMounted, ref } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();
const isLoggedIn = ref(false);
const showMenu = ref(false);
const toggleNav = () => {
  showMenu.value = !showMenu.value;
};
const show = ref(false);
import store from "../store";

function handleSignOut (){
  store.dispatch('logout')
  .then(() => {
    router.push('/login')
  })
}
onMounted(() => {
  if (store.state.user.token) {
    isLoggedIn.value = true;
  }
});
</script>
