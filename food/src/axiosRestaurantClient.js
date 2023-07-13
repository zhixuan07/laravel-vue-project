import axios from "axios";

const axiosRestaurantClient = axios.create({
    baseURL: 'https://travel-advisor.p.rapidapi.com/restaurants',
    headers: {
        'X-RapidAPI-Key': '52125a3c84msh8a1695c20591ee0p1fc13fjsnc48a5de9257e',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      },
   
})


export default axiosRestaurantClient;