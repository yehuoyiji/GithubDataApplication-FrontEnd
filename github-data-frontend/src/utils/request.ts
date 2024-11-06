
// @ts-ignore
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7899',
    timeout: 50000
})

instance.interceptors.request.use((config: any) => {
    console.log('Request intercepted', config.response)
    return config
})

instance.interceptors.response.use((response: any) => {
    return response
})
export default instance;