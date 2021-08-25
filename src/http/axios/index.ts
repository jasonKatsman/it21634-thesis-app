import axios from 'axios'


// const URL = 'https://it21634-nodejs-coin-api-diz68qj3s-jasonkatsman.vercel.app/api/';
const URL = 'http://localhost:8080/api/';


const axiosInstance = axios.create({
    baseURL: URL
})

export const get = (url: string, params?: any): Promise<any> => {
    return axiosInstance.get(url, params);
}