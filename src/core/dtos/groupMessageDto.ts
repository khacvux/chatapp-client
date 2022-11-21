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
}

export interface IGroup {
  id: number;
  creatorId: number;
  title: string;
  lastMessageSent: string;
  lastMessageAt: string;
  avatar: string;
  createAt: string;
}

export interface IGroupMessageStore {
  currentListGroupMessage: [IGroupMessage] | undefined;
  myGroups: [IGroup] | undefined;
  fetchMyGroups: (access_token: string) => void;
}
