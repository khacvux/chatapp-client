import create from "zustand";
import { IListFriendStore } from "../dtos";

export const useFriendStore = create<IListFriendStore>((set, get) => ({
    listFriends: [],
    listFriendsSelected: [],

    setListFriends: (listFriends) => {
        set({
            listFriends: listFriends,
        });
    },
    clearListFriends: () => {
        set({
            listFriends: []
        })
    },

    setListFriendsSelected: (listFriends) => {
        set({
            listFriendsSelected: listFriends
        })
    },
    clearListFriendsSelected: () => {
        set({
            listFriendsSelected: []
        })
    },
    pushListFriendsSelectedItem: (item) => {
        const list = [...get().listFriendsSelected]
        list.push(item)
        set({
            listFriendsSelected: list
        })
    },
    removeListFriendsSelectedItem: (item) => {
        const list = [...get().listFriendsSelected]
        const index = list.findIndex(i=>i.id===item.id)
        index>-1&&
        list.splice(index,1)
        set({
            listFriendsSelected: list
        })

    },
}));
