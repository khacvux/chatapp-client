import create from "zustand";
import { persist } from "zustand/middleware";
import { getchats } from "../apis";
import { IMessage, IMessageStore, ResponseGenerator } from "../dtos";

export const useMessageStore = create<IMessageStore>()(
  persist(
    (set, get) => ({
      currentChatPersonID: undefined,
      currentChatPerson: undefined,
      currentListMessage: [],
      setCurrentChatPerson: ({ id, username }) => {
        set({
          currentChatPerson: { id, username },
        });
      },
      fetchChats: async ({ receiverId, access_token }) => {
        const response:any = await getchats({ receiverId, access_token });
        if (response?.status == 200&&response.data) {
          set({
            currentListMessage: response.data,
          });
        }
        
      },
      pushMessageItem: (item) => {
        const list = [...get().currentListMessage];
        item&&list.push(item);
        set({
          currentListMessage: list,
        });
        console.log(list)
      },
      clear: () => {
        set({
          currentChatPersonID: undefined,
          currentChatPerson: undefined,
          currentListMessage: [],
        });
      },
    }),
    {
      name: "message-storage",
    }
  )
);
