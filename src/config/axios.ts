// import { BASE_URL_PART } from "./constants";

import Axios from "axios"




const VITE_BASE_API = Axios.create({
    
    baseURL:"http://localhost:5207/api/",
    headers:{
        'Content-Type':'application/json'
    }
})


const VITE_ADDRESS_API = Axios.create({
    
    baseURL:"https://raw.githubusercontent.com/kongvut/thai-province-data/master/",
    headers:{
        'Content-Type':'application/json'
    }
})






export default{ 
    VITE_BASE_API,
    VITE_ADDRESS_API
};