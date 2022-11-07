import create from "zustand";
import { persist } from "zustand/middleware";
import { getchats, getusers } from "../apis";
import { IMessage, IMessageStore, ResponseGenerator } from "../dtos";

export const useMessageStore = create<IMessageStore>()(
  persist(
    (set, get) => ({
      listContact: undefined,
      currentChatPersonID: undefined,
      currentChatPerson: undefined,
      currentListMessage: undefined,
      fetchListContact: async (access_token) => {
        const response: any = await getusers(access_token);
        if (response.status == 200) {
          set({
            listContact: response.data.users,
          });
        }
      },
      setCurrentChatPerson: ({ id, username }) => {
        set({
          currentChatPerson: { id, username },
        });
      },
      fetchChats: async ({ receiverId, access_token }) => {
        const response: any = await getchats({ receiverId, access_token });
        if (response.status == 200) {
          set({
            currentListMessage: response.data.chats,
          });
        }
      },
      pushMessageItem: (item) => {
        const list = get().currentListMessage;
        list?.push(item);
        set({
          currentListMessage: list,
        });
      },
    }),
    {
      name: "message-storage",
    }
  )
);
