import { IUser } from "./authDto";
import { IFriend } from "./messageDto";

export interface IUserResult extends IUser {
  status: number;
}

export interface IFriendStore {
  listFriend: [IFriend] | IFriend[];
  listFriendRequest: [IUser] | IUser[];
  listUserResult: [IUserResult] | IUserResult[];
  seachLikeUserame: ({
    querry,
    access_token,
  }: {
    querry: string;
    access_token: string;
  }) => void;
  fetchListFriend: (access_token: string) => void;
  fetchFriendRequests: (access_token: string) => void;
  deleteFriend: (access_token: string, id: number) => void;
  addFriend: (access_token: string, id: number) => void;
  acceptRequest: (access_token: string, id: number) => void;
  cancelRequest: (access_token: string, id: number) => void;
  rejectRequest: (access_token: string, id: number) => void;
  clear: () => void;
}
