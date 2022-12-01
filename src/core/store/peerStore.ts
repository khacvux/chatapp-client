import create from "zustand";
import { getPeerId, updatePeerId } from "../apis/user";
import { IPeerStore } from "../dtos";

export const usePeerStore = create<IPeerStore>()((set, get) => ({
  peerClient: undefined,
  peerId: undefined,
  currentGuestPeerId: undefined,
  fetching: false,
  setPeer: (peerClient) => {
    set({
      peerClient
    })
  },
  setPeerId: (peerId) => {
    set({
      peerId: peerId,
    });
  },
  clearPeerId: () => {
    set({
      peerId: undefined,
    });
  },
  pushPeerId: async (access_token, peerId) => {
    try {
      const response: any = await updatePeerId(access_token, peerId);
      if (response.status == 201) {
        console.log("updated peerId");
      }
    } catch (error) {
      console.log(error);
    }
  },
  getPeerId: async (access_token, userid) => {
    try {
      set({
        fetching: true,
      });
      const response: any = await getPeerId(access_token, userid);
      if (response.status == 200) {
        set({
          fetching: false,
          currentGuestId: response.data.peerId,
        });
        return response.data.peerId;
      }
    } catch (error) {
      set({
        fetching: false,
      });
      console.log(error);
    }
  },

}));
