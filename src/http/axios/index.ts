import axios from 'axios'
const URL = 'http://localhost:8080/api/';

const axiosInstance = axios.create({
    baseURL: URL
})

export const get = (url: string, params?: any): Promise<any> => {
    return axiosInstance.get(url, params);
}