import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        Authorization: 'bearer ' + localStorage.getItem('token') // 
    }
}) 
export const apiFormData = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        "Content-Encoding": "multipart/form-data",
        Authorization: localStorage.getItem('token')
    }
}) 


// api.interceptors.response.use((value)=> {})