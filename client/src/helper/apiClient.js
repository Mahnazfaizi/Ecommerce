import axios from 'axios';

// this function set the base url of the backend server for axios
const apiClient = axios.create({
    baseURL: "http://localhost:3000",
})

export default apiClient;