import axios from "axios";

export default axios.create({
    baseURL: 'https://ai-vision-api.azurewebsites.net/api'
})


