import axios from "axios";
const axiosGetGeocoder = axios.create({
    baseURL:"https://forward-reverse-geocoding.p.rapidapi.com/v1",
    headers: {
        'X-RapidAPI-Key': '52125a3c84msh8a1695c20591ee0p1fc13fjsnc48a5de9257e',
        'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
      }
})
 export default axiosGetGeocoder;