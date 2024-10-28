import {instance, IResponse} from "./api";
import {IPost} from "../store/postsStore";

interface IResponsePosts {
    posts: IPost[]
    totalPosts: number
    totalPages: number
}

export interface IResponseCreatePost {
    newPost: IPost
    totalPosts: number
    totalPages: number
}

export const postsAPI = {
    getPosts(userId: number) {
        return instance.get<IResponsePosts>(`posts/${userId}?page=${1}`)
            .then(res => res.data);
    },

    getMorePosts(userId: number, page: number) {
       return instance.get<IResponsePosts>(`posts/${userId}?page=${page}`)
           .then(res => res.data);
    },

    createPost(userId: number, message: string) {
        return instance.post<IResponseCreatePost>(`http://localhost:3001/api/posts/create_post`, {
            message: message,
            profile: userId
        }).then(res => res.data)
    }
}