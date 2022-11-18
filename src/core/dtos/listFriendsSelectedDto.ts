import { IFriend } from "./index"
export interface IListFriendsSelectedStore{
    listFriendsSelected: IFriend[]|[]
    listFriends:IFriend[]|[]
    
    setListFriends: (listFriends:IFriend[]) => void
    clearListFriends:()=>void

    setListFriendsSelected: (listFriends:IFriend[]) => void
    clearListFriendsSelected:()=>void
    pushListFriendsSelectedItem: (item:IFriend) => void
    removeListFriendsSelectedItem: (item:IFriend) => void
}