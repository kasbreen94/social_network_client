import {makeAutoObservable, runInAction} from "mobx";
import {instance, socket} from "../api/api";
import {postsAPI} from "../api/postsAPI";

interface ILikeItem {
    id: string
    sender_id: number
    sender_name: string
    sender_photo: string
}

export interface IPost {
    id: string
    message: string
    sender_name: string
    sender_id: number
    sender_photo: string
    likes: ILikeItem[]
    createdAt: Date
    updatedAt: Date
}

export interface IPosts {
    [userId: string]: IPost[]
}

export class PostsStore {
    store;

    notifications = {
        "messages": [],
        "likes": []
    }

    posts: IPosts = {};
    currentPage: number = 1
    totalPosts: number | null = null
    totalPages: number | null = null

    constructor(store) {
        makeAutoObservable(this);
        this.store = store
    }

    setPosts = (userId: string, posts) => {
        this.posts[`${userId}`] = posts
    }

    setCurrentPage = (page) => {
        this.currentPage = page
    }

    clearPosts = (userId: string) => {
        this.posts[userId] = []
    }

    getPosts = async (userId: number) => {
        try {
            const data = await postsAPI.getMorePosts(userId, this.currentPage)
            runInAction(() => {
                if(this.currentPage === 1) {
                    this.posts[userId] = data.posts
                } else {
                    this.posts[userId] = [...this.posts[userId], ...data.posts]

                }
                this.currentPage = this.currentPage + 1
                this.totalPages = data.totalPages
                this.totalPosts = data.totalPosts
            })
        } catch (error) {
            console.log(error)
        }
    }

    startPostsListening = async (authId, recipientId) => {
        await socket.on('resPost', (data) => {
            runInAction(() => {
                if (recipientId === data.newPost.profile) {
                    this.posts[`${data.newPost.profile}`].unshift(data.newPost)
                    this.totalPosts = data.totalPosts
                    console.log(this.posts)
                }

                console.log(`newPost ${recipientId}`)
                if (data.newPost.profile === authId) {
                    this.notifications.messages.push(data.newPost)
                }
            })
        })

        await socket.on('updatePost', (data) => {
            try {
                runInAction(() => {
                    const postForUpdate = this.posts[recipientId].find(post => post.id === data.id);
                    if (!postForUpdate) throw new Error('Post not found')

                    postForUpdate.message = data.message
                })
            } catch (e) {
                console.log(e)
            }
        })

        await socket.on('delPost', (data) => {
            runInAction(() => {
                this.posts[recipientId] = this.posts[recipientId].filter(post => post.id !== data.post.id)
                this.totalPosts = data.totalPosts
            })
        })

        await socket.on('resLike', (data) => {
            try {
                runInAction(() => {
                    if (recipientId === data.profile) {
                        const postForLike = this.posts[`${data.profile}`].find(post => post.id === data.newLike.post.id);
                        if (!postForLike) throw new Error('Post not found')
                        postForLike.likes.push(data.newLike)
                    }
                })

            } catch (e) {
                console.log(e)
            }
        })

        await socket.on('delLike', (data) => {
            try {
                const postForLike = this.posts[recipientId].find(post => post.id === data.like.post.id);
                if (postForLike) {
                    runInAction(() => {
                        postForLike.likes = postForLike.likes.filter(like => like.id !== data.like.id)
                    })
                }
            } catch (e) {
                console.log(e)
            }
        })
    }
}