import { IUser } from "./authDto";

export interface ICreateGroup {
  users: number[];
  title?: string;
  avatar?: string;
}

export interface IUpdateGroupOwner {
  newOwnerId: number;
}

export interface IUpdateGroupDetails {
  title?: string;
  avatar?: string;
}

export interface IGroupMessage {
  id: number;
  groupId: number;
  from: number;
  message: string;
  createAt: string;
  updateAt: string;
  fromUser: IUser;
}

export interface IGroup {
  id: number;
  creatorId: number;
  users?: IUser[];
  title: string;
  lastMessageSent: string;
  lastMessageAt: string;
  avatar: string;
  createAt: string;
}

export interface IUpdateLastMessage {
  groupId: number;
  message: string;
  updateAt: string;
}

export interface IGroupMessageStore {
  currentListGroupMessage: [IGroupMessage] | undefined;
  myGroups: [IGroup] | undefined;
  fetchGroupMessages: (access_token: string, groupId: number) => void;
  fetchMyGroups: (access_token: string) => void;
  pushMessage: (message: IGroupMessage) => void;
  updateMyGroups: (group: IGroup) => void;
  createGroup: (access_token: string, data: ICreateGroup) => void;
  updateLastMessage: (payload: IUpdateLastMessage) => void;
}
