import axios from "axios";

const axiosFoodClient = axios.create({
    baseURL: 'https://themealdb.p.rapidapi.com/',
    headers: {
      'X-RapidAPI-Key': '52125a3c84msh8a1695c20591ee0p1fc13fjsnc48a5de9257e',
      'X-RapidAPI-Host': 'themealdb.p.rapidapi.com'
    }
});

export default axiosFoodClient;
