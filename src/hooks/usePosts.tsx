import {useEffect, useState} from "react";
import axios, {post} from "axios";
import {useParams} from "react-router-dom";
import {useStore} from "../store";
import {socket} from "../api/api";
import {useAuth} from "./useAuth";

export type likeTypes = {
    id: number
    senderId: number
    senderName: string
    senderPhoto: string
}

export type PostTypes = {
    id: number
    likes: likeTypes[]
    message: string
    senderName: string
    senderId: number
    senderPhoto: string
}

export const usePosts = (userId, authId) => {

    const {isAuth} = useAuth()
    const {profilePostsStore} = useStore()
    const {startPostsListening, getPosts} = profilePostsStore

    const createPost = async (recipientId: number, message: string) => {
        await socket.emit("createPost", {recipientId, message})
    }

    const updatePost = async (postId: string, recipientId: number, message: string) => {
        await socket.emit("updatePost", { postId, recipientId, message })
    }

    const deletePost = async (postId: string, recipientId: number) => {
        await socket.emit("deletePost", {postId, recipientId})
    }

    const createLike = async (postId, recipientId) => {
        await socket.emit("createLike", {postId, recipientId})
    }

    const deleteLike = async (postId, recipientId) => {
        await socket.emit("deleteLike", {postId, recipientId})
    }

    useEffect(() => {
        // handlePostsConnection(userId)
        if (isAuth){
            startPostsListening(authId, userId)
        }
        return () => {
            socket.off(`resPost`);
            socket.off(`resLike`);
        }
    }, [userId, authId, isAuth]);

    return {getPosts, createPost, updatePost , deletePost, createLike, deleteLike};
}