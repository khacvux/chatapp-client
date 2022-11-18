export interface IFriend{
    id:number
}


export interface IListFriendStore{
    listFriends: IFriend[]|[]
    listFriendsSelected: IFriend[]|[]
    
    setListFriends: (listFriends:IFriend[]) => void
    clearListFriends:()=>void

    setListFriendsSelected: (listFriends:IFriend[]) => void
    clearListFriendsSelected:()=>void
    pushListFriendsSelectedItem: (item:IFriend) => void
    removeListFriendsSelectedItem: (item:IFriend) => void
}