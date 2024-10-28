import axios from "axios";
import {getTokenFromLocalStorage} from "../helpers/localstorage.helper";
import {io, Socket} from "socket.io-client";

const URL = "http://localhost:3001/";
export const socket = io(URL, {
    // autoConnect: false,
    auth: {
        token: `${getTokenFromLocalStorage()}`,
    }
})

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3001/api/',
})
instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getTokenFromLocalStorage()}`
    return config
})

export interface IResponse<D> {
    data: D
}