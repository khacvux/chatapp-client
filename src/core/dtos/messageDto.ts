export interface IMessage {
  id: number | undefined;
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

export interface ICurrentChatPerson {
  id: number | undefined;
  username: string | undefined;
}

export interface IMessageStore {
  listContact: [IContact] | undefined;
  currentChatPersonID: number | undefined;
  currentChatPerson: ICurrentChatPerson | undefined;
  currentListMessage: [IMessage] | undefined;
  fetchListContact: (access_token: string) => void;
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
  pushMessageItem: (item: IMessage) => void
}
