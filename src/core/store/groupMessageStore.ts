import create from "zustand";
import { persist } from "zustand/middleware";
import { createGroup, getGroupMessages, getGroups } from "../apis";
import { IGroupMessageStore } from "../dtos";

export const useGroupMessageStore = create<IGroupMessageStore>()(
  persist(
    (set, get) => ({
      currentListGroupMessage: undefined,
      myGroups: undefined,
      fetchGroupMessages: async (access_token, groupId) => {
        const response: any = await getGroupMessages({ access_token, groupId });
        if (response?.status == 200) {
          set({
            currentListGroupMessage: response.data,
          });
        }
      },
      fetchMyGroups: async (access_token) => {
        const response: any = await getGroups({ access_token });
        if (response?.status == 200) {
          set({
            myGroups: response.data,
          });
        }
      },
      pushMessage: (message) => {
        const list = get().currentListGroupMessage;
        list?.push(message);
        set({
          currentListGroupMessage: list,
        });
      },
      updateMyGroups: (group) => {
        const myGroups = get().myGroups;
        myGroups?.push(group);
        set({
          myGroups: myGroups,
        });
      },
      createGroup: async (access_token, data) => {
        await createGroup({
          access_token,
          data,
        });
      },
      updateLastMessage: async (payload) => {
        const myGroups = get().myGroups;
        myGroups?.map((group) => {
          if (group.id == payload.groupId) {
            group.lastMessageAt = payload.updateAt;
            group.lastMessageSent = payload.message;
            return group;
          } else return group;
        });
      },
    }),
    {
      name: "group-message-storage",
    }
  )
);
