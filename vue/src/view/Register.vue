\
<template>
  <div class="bg-white shadow-md rounded px-8 py-7 pt-4 pb-8 w-80">
    <form>
      <div class="mb-7 flex justify-center">
        <h1
          class="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-3xl font-black"
        >
          Register
        </h1>
      </div>
      <div class="mb-8">
        <label class="block mb-2 sm:text-sm">Email</label>
        <input
          class="rounded shadow appearance-none border px-2 py-2 w-full"
          type="text"
          placeholder="Email"
          v-model="email"
        />
      </div>

      <div class="mb-8">
        <label class="block mb-2 sm:text-sm">Password</label>
        <input
          class="rounded border shadow appearance-none px-2 py-2 w-full"
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <p class="text-red-700 text-sm" v-if="errmsg">{{ errmsg }}</p>
      </div>

      <div class="w-full flex flex-col items-center">
        <button
          class="block ml-18 px-6 py-2 w-48 mb-4 bg-indigo-600 rounded-xl text-white hover:bg-indigo-700 sm:text-sm"
          @click="register"
        >
          Register
        </button>
        <button
          class="px-6 py-2 w-48 bg-indigo-600 rounded-xl text-white hover:bg-indigo-700 sm:text-sm"
          @click="signinWithGoogle"
        >
          Sign in With Google
        </button>
      </div>
    </form>

    <div class="mt-3 text-sm">
      <p>
        Already have account?
        <span
          ><router-link to="/login" class="text-blue-700 hover:text-blue-400">Login</router-link>
        </span>
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const email = ref('')
const password = ref('')
const router = useRouter()
const errmsg = ref(null)
const store = useStore()
</script>
