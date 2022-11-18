import { IFriend } from "./index"
export interface IListFriendsSelectedStore{
    listFriendsSelected: IFriend[]|[]
    listFriends:IFriend[]|[]
    
    setListFriends: (listFriends:IFriend[]) => void

    setListFriendsSelected: (listFriends:IFriend[]) => void
    pushListFriendsSelectedItem: (item:IFriend) => void
    removeListFriendsSelectedItem: (item:IFriend) => void
    
    clear:()=>void
}