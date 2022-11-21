import create from "zustand";
import { persist } from "zustand/middleware";
import { getchats } from "../apis";
import { getGroups } from "../apis/group-message";
import { IGroupMessageStore } from "../dtos";

export const useGroupMessageStore = create<IGroupMessageStore>()(
  persist(
    (set, get) => ({
      currentListGroupMessage: [],
      myGroups: [],
      fetchMyGroups: async (access_token) => {
        const response: any = await getGroups({ access_token });
        if (response?.status == 200) {
          set({
            myGroups: response.data,
          });
        }
      },
    }),
    {
      name: "group-message-storage",
    }
  )
);
