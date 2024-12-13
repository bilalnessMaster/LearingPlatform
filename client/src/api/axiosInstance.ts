
import axios from 'axios';


const axiosInstance  = axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials : true , 
    
        
})

axiosInstance.interceptors.request.use(config => {
    const token : string | null = sessionStorage.getItem('accessToken')
    const accessToken  = token ? JSON.parse(token)  : null
    if(accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config
},(error) => Promise.reject(error))

export default axiosInstance ;