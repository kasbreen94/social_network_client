import {makeAutoObservable} from "mobx";
import axios, {AxiosRequestConfig} from "axios";
import {instance, socket} from "../api/api";
import {
    getTokenFromLocalStorage,
    removeTokenFromLocalStorage,
    setTokenToLocalStorage
} from "../helpers/localstorage.helper";
import {authAPI} from "../api/authAPI";


export interface IUserData {
    email: string,
    password: string
}

export interface IResponseUserData {
    id: number
    email: string
    token: string
}

export interface AuthMeI {
    authId: number | null
    email: string | null
    isAuth: boolean
}

export class AuthStore {
    authMe: AuthMeI = {
        authId: null,
        email: null,
        isAuth: false
    }

    constructor(store) {
        makeAutoObservable(this);
    }

    setAuthMe = (authMe) => {
        this.authMe = authMe
    }

    getAuthMe = async () => {
        try {
            const data = await authAPI.authMe()
            if(data) {
                const {id, email} = data
                this.setAuthMe({authId: id, email: email, isAuth: true})
            } else {
                await this.logout()
            }

            console.log('auth', this.authMe)
        } catch (e) {

        }
    }

    login = async (user: IUserData) => {
        try {
            const data = await authAPI.login(user)

            setTokenToLocalStorage('token', data.token)
            // this.setAuthMe({isAuth: true})
            this.setAuthMe({authId: data.id, email: data.email, isAuth: true})
            // await this.getAuthMe()
            console.log('login', this.authMe.isAuth)


        } catch (error) {
            console.log('error', error)
        }

    };

    logout = async () => {
        await removeTokenFromLocalStorage()
        this.setAuthMe({authId: null, email: null, isAuth: false})
        socket.disconnect()
    };
}