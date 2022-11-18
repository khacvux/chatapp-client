import create from "zustand";
import { IListFriendsSelectedStore } from "../dtos";

export const useListFriendStore = create<IListFriendsSelectedStore>((set, get) => ({
    listFriendsSelected: [],
    listFriends: [],
    setListFriends: (listFriends) => {
        set({
            listFriends: listFriends,
        });
    },

    setListFriendsSelected: (listFriends) => {
        set({
            listFriendsSelected: listFriends
        })
    },

    pushListFriendsSelectedItem: (item) => {
        const listSelected = [...get().listFriendsSelected]
        const list = [...get().listFriends]

        const index = list.findIndex(i => i.id === item.id)
        if (index > -1) {
            listSelected.push(item)
            list.splice(index, 1)
        }
        set({
            listFriendsSelected: listSelected,
            listFriends: list
        })
    },
    removeListFriendsSelectedItem: (item) => {
        const listSelected = [...get().listFriendsSelected]
        const list = [...get().listFriends]

        const index = listSelected.findIndex(i => i.id === item.id)
        if (index > -1) {
            listSelected.splice(index, 1)
            list.push(item)
        }
        set({
            listFriendsSelected: listSelected,
            listFriends: list
        })

    },
    clear: () => {
        set({
            listFriendsSelected: [],
            listFriends: []
        })
    },
}));
