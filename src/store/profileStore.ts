import {makeAutoObservable, runInAction} from "mobx";
import {instance, socket} from "../api/api";

interface IResponseIsFriendData {
    dataForTargetUser:{
        id: number
        isFriend: boolean | 'subscriber'
    }
    dataForAuthUser:{
        id: number
        isFriend: boolean | 'subscriber'
    }
}

export interface IProfileContacts {
    phone_number: string
    my_website: string
    vk: string
    github: string
}

export interface IProfile {
    id: number
    status: string
    full_name: string
    photo: string
    birthday: string
    city: string
    place_of_work: string
    about_me: string
    contacts: IProfileContacts
    isFriend: boolean | 'subscriber'
}

export class ProfileStore {

    store;

    profile = {} as IProfile;

    constructor(store) {
        makeAutoObservable(this);
        this.store = store
    }

    setProfile = (profile) => {
        this.profile = profile
    }

    setIsFriend = (userId, data: IResponseIsFriendData) => {
        if (userId === data.dataForTargetUser.id) {
            this.profile.isFriend = data.dataForTargetUser.isFriend
        }
        if (userId === data.dataForAuthUser.id) {
            this.profile.isFriend = data.dataForAuthUser.isFriend
        }
    }

    startFriendListening = async (authId: number, userId: number) => {
        await socket.on('createFriend', (data) => {
            this.setIsFriend(userId, data)
            this.store.usersStore.setIsFriend(userId, data)
        })
        await socket.on('deleteFriend', (data) => {
            this.setIsFriend(userId, data)
            this.store.usersStore.setIsFriend(userId, data)
        })
    }

    addFriend = async (userId: number) => {
        socket.emit('createFriend', {friend_id: userId})
    }

    deleteFriend = async (userId: number) => {
        socket.emit('deleteFriend', userId)
    }

    getProfile = async (userId: number | null) => {
        const data = await instance.get(`profile/${userId}`).then(res => {
            if (res.status === 200) {
                runInAction(() => {
                    this.profile = res.data
                })

            }
        });
    };

    updateProfile = async (profile) => {
        const data = await instance.patch(`profile/update`, profile ).then(res => {
            try {
                runInAction(() => {
                    this.profile = res.data
                })
            } catch (e) {
                console.log(e)
            }
        })
    }
}