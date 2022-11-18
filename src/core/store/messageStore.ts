import create from "zustand";
import { persist } from "zustand/middleware";
import { getchats } from "../apis";
import { IMessage, IMessageStore, ResponseGenerator } from "../dtos";

export const useMessageStore = create<IMessageStore>()(
  persist(
    (set, get) => ({
      currentChatPersonID: undefined,
      currentChatPerson: undefined,
      currentListMessage: undefined,
      setCurrentChatPerson: ({ id, username }) => {
        set({
          currentChatPerson: { id, username },
        });
      },
      fetchChats: async ({ receiverId, access_token }) => {
        const response: any = await getchats({ receiverId, access_token });
        if (response.status == 200) {
          set({
            currentListMessage: response.data,
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
      clear: () => {
        set({
          currentChatPersonID: undefined,
          currentChatPerson: undefined,
          currentListMessage: undefined,
        });
      },
    }),
    {
      name: "message-storage",
    }
  )
);
