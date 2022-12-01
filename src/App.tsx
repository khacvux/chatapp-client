import { ReactNode, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { ModalTypes, ThemeTypes, ToastTypes } from "./core/dtos";
import {
  useAuthStore,
  useFriendStore,
  useMessageStore,
  useRouterStore,
} from "./core/store";
import { useGroupMessageStore } from "./core/store/groupMessageStore";
import { usePreferenceStore } from "./core/store/preferenceStore";
import { BASE_URL } from "./utils";
import MessageRing from "./assets/sounds/messenger_web.mp3";
import { Peer } from "peerjs";
import { usePeerStore } from "./core/store/peerStore";
import Router from "./Router";
import { useSocketStore } from "./core/store/socketStore";
import ToastContainer from "./presentations/components/Toasts/ToastContainer";
import { useToastStore } from "./core/store/toastStore";

function App() {
  const preferenceStore = usePreferenceStore();
  const messageStore = useMessageStore();
  const groupMessageStore = useGroupMessageStore();
  const socket = useRef<Socket | undefined>();
  const peerClient = useRef(new Peer());
  const authStore = useAuthStore();
  const friendStore = useFriendStore();
  const audio = useRef(new Audio(MessageRing));
  const peerStore = usePeerStore();
  const modalStore = useRouterStore();
  const socketStore = useSocketStore();
  const toastStore = useToastStore();

  useEffect(() => {
    if (authStore.access_token.length) {
      socket.current = io(BASE_URL, {
        extraHeaders: {
          access_token: authStore.access_token,
        },
      });
      if (socket.current) {
        socketStore.setSocket(socket);
      }
      friendStore.fetchFriendRequests(authStore.access_token);
      groupMessageStore.fetchMyGroups(authStore.access_token);
      peerClient.current.on("open", function (id) {
        peerStore.setPeer(peerClient.current);
        peerStore.setPeerId(id);
        peerStore.pushPeerId(authStore.access_token, id);
      });
    }
  }, [authStore.access_token]);

  useEffect(() => {
    if (authStore.access_token.length) {
      socket.current?.on("receiveMessage", (data) => {
        audio.current.play();
        messageStore.pushMessageItem(data.message);
      });

      socket.current?.on("onGroupMessage", (data) => {
        if (data.from != authStore.id) audio.current.play();
        groupMessageStore.pushMessage(data);
        groupMessageStore.updateLastMessage(data);
      });

      socket.current?.on("onGroupCreate", (newGroup) => {
        groupMessageStore.updateMyGroups(newGroup);
      });

      socket.current?.on("notify.friend.request", (user) => {
        audio.current.play();
        friendStore.updateFriendRequests(user.response);
      });

      socket.current?.on("notify.friend.accept", (user) => {
        friendStore.updateListFriend(user.response);
        friendStore.handleAcceptFriendRequest(user.response);
      });

      socket.current?.on("onVideoCall", (data) => {
        modalStore.setCaller(data.callerInfo);
        modalStore.setModals(ModalTypes.AnsweringACall);
      });

      socket.current?.on("onUserUnavailable", () => {
        modalStore.setModals(ModalTypes.none);
        toastStore.setToast(ToastTypes.UserUnvailable);
      });
    }

    return () => {
      socket.current?.off("receiveMessage");
      socket.current?.off("onGroupMessage");
      socket.current?.off("onGroupCreate");
      socket.current?.off("notify.friend.request");
      socket.current?.off("notify.friend.accept");
      socket.current?.off("onVideoCall");
      socket.current?.off("onUserUnavailable");
    };
  }, [authStore.access_token.length]);

  useEffect(() => {
    if (groupMessageStore.myGroups?.length) {
      socket.current?.emit("onGroupJoin", {
        groupIds: groupMessageStore.myGroups?.map((group) => group.id),
      });
    }
  }, [groupMessageStore.myGroups]);

  useEffect(() => {
    if (preferenceStore.theme == ThemeTypes.System) {
      preferenceStore.setSystemTheme();
    }
  }, [preferenceStore.theme]);

  // useEffect(() => {
  //   modalStore.setModals(ModalTypes.AnsweringACall);
  // }, []);

  return (
    <div
      className={`${
        preferenceStore.theme == ThemeTypes.System
          ? preferenceStore.systemTheme
          : preferenceStore.theme
      } w-screen h-screen overflow-hidden`}
    >
      <BrowserRouter>
        <Router socket={socket} />
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
