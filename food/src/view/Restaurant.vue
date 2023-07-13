<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

import axiosRestaurantClient from "../axiosRestaurantClient";
import axiosGetGeocoder from "../axiosGetGeocoder";
import { ref,reactive } from "vue";
import { computed } from "@vue/reactivity";
const restaurants = ref([]);
const location = ref(null);
const errorMessage = ref('');
const loading = ref(false);


const states = ["Penang", "Perak", "Kuala Lumpur","Selangor","Melaka","Johor"]; // Replace with your state data
const areas = reactive({
  "Penang": ["George Town",
    "Bayan Lepas",
    "Bukit Mertajam",
    "Butterworth",
    "Seberang Jaya",],
  "Perak": [ "Ipoh",
    "Taiping",
    "Teluk Intan",
    "Kuala Kangsar",
    "Lumut"],
  "Kuala Lumpur": ["Bukit Bintang",
    "KLCC",
    "Chinatown",
    "Brickfields",
    "Bangsar"],
  "Selangor": [
    "Petaling Jaya",
    "Shah Alam",
    "Subang Jaya",
    "Klang",
    "Puchong",
    
  ],
});

const selectedState = ref("");
const selectedArea = ref("");

function selectState() {
  selectedArea.value = ""; // Reset selected area when state changes
}

// Computed property to filter areas based on the selected state
const filteredAreas = computed(() => {
  if (selectedState.value) {
    return areas[selectedState.value];
  }
  return [];
});

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    errorMessage.value = 'Geolocation is not supported by this browser.';
  }
};

const onSuccess = (position) => {
  location.value = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };

  // Call the API to fetch restaurants using the obtained location
  fetchRestaurants();
};

const onError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errorMessage.value = 'User denied the request for Geolocation.';
      break;
    case error.POSITION_UNAVAILABLE:
      errorMessage.value = 'Location information is unavailable.';
      break;
    case error.TIMEOUT:
      errorMessage.value = 'The request to get user location timed out.';
      break;
    case error.UNKNOWN_ERROR:
      errorMessage.value = 'An unknown error occurred.';
      break;
  }
};

const fetchRestaurants = async () => {
  if (location.value) {
    loading.value = true; 
    // Make the API request to fetch restaurants using the obtained location
    try{
    const response = await axiosRestaurantClient.get(`list-by-latlng`, {
      params: {
        latitude: location.value.latitude,
        longitude: location.value.longitude,
        limit: '10',
        currency: 'MYR',
        distance: '1000',
        open_now: 'false',
        lunit: 'km',
        lang: 'en_US',
      },

    });
    restaurants.value = response.data.data;
    console.log(restaurants.value);
  } catch (error) {
      console.error(error);
      errorMessage.value = 'Failed to fetch restaurants';
    } finally {
      loading.value = false; // Set loading to false after the request completes
    }


    
   
    
  }
};
onMounted(()=>{
  getLocation();
})

const getGeoCoder = async()=>{

  const response = await axiosGetGeocoder.get(`/forward`,{
      params: {
        city: selectedArea.value,
        state: selectedState.value,
        country: 'Malaysia',
        'accept-language': 'en',
        polygon_threshold: '0.0'
      },
    });
    location.value ={
      latitude : response.data[0].lat,
      longitude: response.data[0].lon

    }
    console.log(location.value.latitude)
    console.log(response.data[0].lat)
    fetchRestaurants()
}
  


   

</script>

<template>
  <div class="">
    <div class="text-3xl flex justify-center m-10 font-bold">
      <h1
        class="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-3xl font-black"
      >
        Restaurant
      </h1>
     

    </div>
    

    <div class="flex justify-center  w-full  ">
    <div class="flex items-center m-2 gap-3 sm:flex sm:flex-col">
      <div class=" flex items-center gap-4">
        <label for="state" class="text-lg font-medium">State:</label>
      <select v-model="selectedState" @change="selectState" class=" w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Select a state</option>
        <option v-for="state in states" :value="state" :key="state">{{ state }}</option>
      </select>
      </div>
      
      <div class=" flex items-center gap-4">
        <label for="area" class="text-lg font-medium">Area:</label>
      <select v-model="selectedArea" class=" w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Select an area</option>
        <option v-for="area in filteredAreas" :value="area" :key="area">{{ area }}</option>
      </select>
      </div>
      <div class="m-2">
        <button @click="getGeoCoder"
          class="block ml-18 px-6 py-2 w-40 m bg-indigo-600 rounded-xl text-white hover:bg-indigo-700 sm:text-sm">Search</button>
      </div>
    </div>
  </div>

  <div v-if="loading" class="flex justify-center items-center h-40">
  <div class="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-gray-900"></div>
</div>
    <div
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 p-20 h-fit sm:p-12"
      v-else
    >
      <div
      
        v-for="restaurant of restaurants"
        :key="restaurant.location_id"
        class="bg-white shadow-md rounded-md relative"
      >
        <div class="pl-3 pt-2 mt-3 mb-3 ml-1">
          <p class="text-lg">{{ restaurant.name }}</p>

          <p class="text-md font-light" v-for="cuisine of restaurant.cuisine">
            {{ cuisine.name }}
          </p>
        </div>
        <img
          v-if="restaurant.photo"
          class="h-60 w-full object-fit rounded-md"
          :src="restaurant.photo.images.small.url"
          alt="N / A"
        />
        <div>
          <h1 class="p-3 underline text-xl">Location and contact</h1>
          <div class="flex justify-start items-center gap-4 p-3">
            <div class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <div class="">
              <p class="text-sm">{{ restaurant.address }}</p>
            </div>
          </div>

          <div class="flex justify-start items-center gap-4 p-3">
            <div class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <div class="">
              <p class="text-sm" v-if="restaurant.phone" >{{ restaurant.phone }}</p>
              <p class="text-sm" v-else>N/A</p>
            </div>
          </div>

          <div class="flex justify-start items-center gap-4 p-3">
            <div class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </div>

            <div class="">
              <a :href=" restaurant.web_url"    target="_blank">View Website</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
