import {ProfileStore} from "./profileStore";
import {PostsStore} from "./postsStore";
import {UsersStore} from "./usersStore";
import {createContext, useContext} from "react";
import {AuthStore} from "./authStore";


class RootStore {
    authStore: AuthStore;
    profileStore: ProfileStore;
    profilePostsStore: PostsStore;
    usersStore: UsersStore;

    constructor() {
        this.authStore = new AuthStore(this)
        this.profileStore = new ProfileStore(this);
        this.profilePostsStore = new PostsStore(this);
        this.usersStore = new UsersStore(this)
    }
}

export const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext)

export interface ResponseI<D> {
    data: D
}