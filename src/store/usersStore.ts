import {makeAutoObservable, runInAction} from "mobx";
import {instance} from "../api/api";

interface IUsers {
    id: number
    full_name: string
    photo: string
    birthday: string
    city: string
    place_of_work: string
    isFriend: boolean | 'subscriber'
}

interface IResponseUsers {
    users: IUsers[]
    totalUsers: number
}

export class UsersStore {

    users: IUsers[] = [] as IUsers[]

    constructor(store) {
        makeAutoObservable(this);
    }

    setIsFriend = (userId, data) => {
        const user = this.users.find(user => user.id === userId)
        if (user) {
            user.isFriend = data.dataForAuthUser.isFriend
        }
    }

    getUsers = async (term: string) => {
        const data = await instance.get<IResponseUsers>(`http://localhost:3001/api/users?term=${term}`).then(res => {
            if (res.status === 200) {
                runInAction(() => {
                    this.users = res.data.users
                })
            }
        })
    }
}