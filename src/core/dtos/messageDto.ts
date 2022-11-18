import { deleteFriend } from "../apis";

export interface IMessage {
  id: number | undefined;
  userId?: number;
  createdAt: string | undefined;
  from: number | undefined;
  to: number | undefined;
  msg: string;
}

export interface IResMessage {
  userId: number;
  createdAt: string | undefined;
  from: number | undefined;
  to: number | undefined;
  msg: string;
}

export interface IContact {
  id: number;
  username: string;
  chat: [IMessage];
}

export interface IFriend {
  id: number;
  info?: IInfoFriend;
}

export interface IInfoFriend {
  id: number;
  email?: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface ICurrentChatPerson {
  id: number | undefined;
  username: string | undefined;
}

export interface IMessageStore {
  currentChatPersonID: number | undefined;
  currentChatPerson: ICurrentChatPerson | undefined;
  currentListMessage: [IMessage] | undefined;
  setCurrentChatPerson: ({
    id,
    username,
  }: {
    id: number;
    username: string;
  }) => void;
  fetchChats: ({
    access_token,
    receiverId,
  }: {
    access_token: string;
    receiverId: number;
  }) => void;
  pushMessageItem: (item: IMessage) => void;
  clear: () => void;
}
