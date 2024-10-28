
import {useEffect, useRef, useState} from "react";
import {useStore} from "../store";
import {IResponseCreatePost} from "../api/postsAPI";
import {socket} from "../api/api";
import {useAuth} from "./useAuth";


export const useConnectSocket = (userId: number | null, authId?: number | null) => {

    const {isAuth} = useAuth()

    const [rooms, setRooms] = useState([])

    const connection = () => {

        socket.onAny((event, ...args) => {
            console.log('socket: ', event, args)
        })

        socket.on("connect_error", (err) => {
            if (err.message === "Invalid token") {
                console.log("Connection error")
            }
        })

        socket.on('connect', () => {

            console.log('connect')
        })

        socket.on('disconnect', () => {
        })

    }

    useEffect(() => {
        if (isAuth) {
            connection()

            socket.on('joinedRoom', (room) => {
                const isRoom = rooms.includes(roomId => roomId === room)
                if(!isRoom) {
                    setRooms([...rooms, room])
                }
            })
            socket.on('leavedRoom', (room) => {
                const isRoom = rooms.includes(room)
                if(isRoom) {
                    setRooms([...rooms].filter(joinedRoom => joinedRoom !== room))
                }
            })

            const isAuthRoom = rooms.includes(`${authId}`)

            if(!isAuthRoom) {
                socket.emit('joinRoom', `${authId}`)
            }
            if(userId !== authId) {
                socket.emit('joinRoom', `${userId}`)
            }
        } else {
            return ;
        }

        console.log('rooms',rooms)
        return () => {
            if(userId !== authId) {
                socket.emit('leaveRoom', `${userId}`)
            }
            socket.off("connect_error");
            socket.offAny()
            socket.off('connect');
            socket.off('disconnect');
            socket.off('joinedRoom');
            socket.off('leavedRoom');
        }
    }, [userId, authId, isAuth]);
}