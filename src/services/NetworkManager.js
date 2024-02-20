import axios from "axios";


const NetworkManager = axios.create({
    baseURL: 'https://ai-vision-api.azurewebsites.net/api',
});



export default NetworkManager;