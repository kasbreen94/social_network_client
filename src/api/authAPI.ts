import {instance, IResponse} from "./api";
import {IResponseUserData, IUserData} from "../store/authStore";
import {AxiosResponse} from "axios";



export const authAPI = {
    authMe() {
        return instance.get<IResponse<IResponseUserData>>(`auth/me`).then(res => res.data)
    },
    login(user: IUserData){
        return  instance.post<IResponse<IResponseUserData>>(`auth/login`, user).then(res => res.data)

    }
}