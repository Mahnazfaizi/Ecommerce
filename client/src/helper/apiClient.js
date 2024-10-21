import axios from 'axios';

// this function set the base url of the backend server for axios
const apiClient = axios.create({
    baseURL: "https://ecommerce-3-i58l.onrender.com",
})

export default apiClient;
