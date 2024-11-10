import axios from 'axios';

// this function set the base url of the backend server for axios
const apiClient = axios.create({
    baseURL: "https://ecommerce-20.onrender.com",
})

export default apiClient;
