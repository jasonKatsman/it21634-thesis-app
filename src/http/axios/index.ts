import axios from 'axios'

const URL = 'https://cors-anywhere.herokuapp.com/https://ghoapi.azureedge.net/api/';

const axiosInstance = axios.create({
    baseURL: URL
})

export const get = (url: string, params?: any): Promise<any> => {
    return axiosInstance.get(url, params);
}