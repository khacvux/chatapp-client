import create from "zustand";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  createFriendRequest,
  deleteFriend,
  getFriendRequest,
  getFriends,
  rejectFriendRequest,
  searchLikeUsername,
} from "../apis";
import { IFriendStore, NotifyTypes } from "../dtos";

export const useFriendStore = create<IFriendStore>((set, get) => ({
  listFriend: [],
  listFriendRequest: [],
  listUserResult: [],
  notifies: [],
  seachLikeUserame: async ({ querry, access_token }) => {
    const response: any = await searchLikeUsername({ querry, access_token });
    if (response.status == 200) {
      set({
        listUserResult: response.data,
      });
    }
  },
  fetchListFriend: async (access_token) => {
    const response: any = await getFriends(access_token);
    if (response.status == 200) {
      set({
        listFriend: response.data,
      });
    }
  },
  fetchFriendRequests: async (access_token) => {
    const response: any = await getFriendRequest(access_token);
    if (response.status == 200) {
      set({
        listFriendRequest: response.data,
      });
    }
  },
  deleteFriend: async (access_token, id) => {
    const response: any = await deleteFriend({ access_token, id });
    if (response.status == 200) {
      const filter = get().listFriend?.filter((item) => {
        return item.info.id != id;
      });
      set({
        listFriend: filter,
      });
    }
  },
  addFriend: async (access_token, id) => {
    const response: any = await createFriendRequest({ access_token, id });
    if (response.status == 201) {
      set({
        listUserResult: get()?.listUserResult.map((item) => {
          if (item.id == id) {
            item.status = 1;
            return item;
          }
          return item;
        }),
      });
    }
  },
  acceptRequest: async (access_token, id) => {
    const response: any = await acceptFriendRequest({ access_token, id });
    if (response.status == 202) {
      set({
        listFriendRequest: get()?.listFriendRequest.filter((item) => {
          return item.id != id;
        }),
      });
    }
  },
  cancelRequest: async (access_token, id) => {
    const response: any = await cancelFriendRequest({ access_token, id });
    if (response.status == 200) {
      set({
        listUserResult: get()?.listUserResult.map((item) => {
          if (item.id == id) {
            item.status = 0;
            return item;
          }
          return item;
        }),
      });
    }
  },
  rejectRequest: async (access_token, id) => {
    const response: any = await rejectFriendRequest({ access_token, id });
    if (response.status == 200) {
      set({
        listFriendRequest: get()?.listFriendRequest.filter((item) => {
          return item.id != id;
        }),
      });
    }
  },
  updateFriendRequests: (user) => {
    const listFriendRequest = get().listFriendRequest;
    set({
      listFriendRequest: [user, ...listFriendRequest],
    });
  },
  updateListFriend: (user) => {
    const listFriend = get().listFriend;
    set({
      listFriend: [user, ...listFriend],
    });
  },
  handleAcceptFriendRequest: (user) => {
    const notifies = get().notifies;
    set({
      notifies: [
        {
          type: NotifyTypes.accept,
          recieveOn: new Date(),
          user: user,
        },
        ...notifies,
      ],
    });
  },
  clear: () => {
    set({
      listUserResult: undefined,
    });
  },
}));
