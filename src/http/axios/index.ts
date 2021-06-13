import axios from 'axios'

const URL = '';

const axiosInstance = axios.create({
    baseURL: URL
})

const get = (url: string, params?: any) => {
    return axiosInstance.get(url, params);
}