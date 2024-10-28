import {socket} from "./api";
import {IResponseCreatePost} from "./postsAPI";


export const socket_posts_api = {

    handleCreatePost() {
        return socket.on('resPost', (data: IResponseCreatePost) => {
            return data
        })

    },

    createPost(userId: number, message: string) {
        socket.emit('createPost', {recipientId: userId, message})
    }
}