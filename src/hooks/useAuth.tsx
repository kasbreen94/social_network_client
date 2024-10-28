import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useStore} from "../store";
import {useEffect, useState} from "react";


export const useAuth = () => {
    const {authStore} = useStore()
    const {authMe, getAuthMe, login, logout} = authStore
    const {isAuth, authId} = authMe
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (!isAuth) {
    //         navigate('/login')
    //     } else {
    //         navigate('/')
    //     }
    //
    // }, [isAuth]);



    let userId = Number(useParams().userId)
    if (!userId && authId) {
        userId = authId
    }

    return {userId, isAuth, authId, getAuthMe, login, logout}
}

// export const setUserId = () => {
//     const {authStore} = useStore()
//     const {authMe, getAuthMe, login, logout} = authStore
//     const {isAuth, authId} = authMe
//     const userId = Number(useParams().userId) || authId
//
//     return userId
// }