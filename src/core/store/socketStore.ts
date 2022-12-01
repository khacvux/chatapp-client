import create from "zustand";
import { ISocketStore } from "../dtos/socketDto";

export const useSocketStore = create<ISocketStore>()((set, get) => ({
  socket: undefined,
  setSocket: (socket: any) => {
    set({
      socket: socket,
    });
  },
  createVideoCall: (recipientId) => {
    get().socket?.current.emit("onVideoCallInitiate", {
      recipientId,
    });
  },
}));
