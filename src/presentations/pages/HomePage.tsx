import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { CurrentRoutType, IMessageStore } from "../../core/dtos";
import { useAuthStore, useRouterStore } from "../../core/store";
import { useMessageStore } from "../../core/store/messageStore";
import { BASE_URL } from "../../utils";
import ChatContainer from "../components/ChatBox/ChatContainer";
import EmptyContainer from "../components/ChatBox/EmptyContainer";
import ContactsContainer from "../components/ContactContainer/ContactsContainer";
import Friends from "../components/Friends/Friends";
import NotifiesContainer from "../components/Notifies/NotifiesContainer";
import Profile from "../components/Profile/Profile";
import Overlays from "./Overlays";

export default function HomePage() {
  const access_token = useAuthStore((state) => state.access_token);
  const socket = useRef<Socket | undefined>();
  const messageStore = useMessageStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (access_token.length <= 0) {
      navigate("/signin");
    }

    if (access_token.length) {
      socket.current = io(BASE_URL, {
        extraHeaders: {
          access_token: access_token,
        },
      });
      messageStore.fetchListContact(access_token);
    }
  }, [access_token]);

  return (
    <div className="w-full h-screen relative">
      <div className=" w-full h-screen flex flex-row overflow-hidden">
        <div className=" w-[90px] lg:w-[360px] h-full z-[2]">
          <ContactsContainer />
        </div>
        <div className=" flex-1 h-full lg:w-full w-chat-container z-[1]">
          <HomeRouter messageStore={messageStore} socket={socket} />
        </div>
      </div>
      <Overlays />
    </div>
  );
}

const HomeRouter = ({
  messageStore,
  socket,
}: {
  messageStore: IMessageStore;
  socket: any;
}) => {
  const routerStore = useRouterStore();
  console.log(routerStore.currentRoute);
  switch (routerStore.currentRoute) {
    case CurrentRoutType.Chatbox:
      return <ChatboxComponent messageStore={messageStore} socket={socket} />;
    case CurrentRoutType.Friends:
      return <Friends />;
    case CurrentRoutType.Notifies:
      return <NotifiesContainer />;
    case CurrentRoutType.Profile:
      return <Profile />;
    default:
      return <></>;
  }
};

const ChatboxComponent = ({
  messageStore,
  socket,
}: {
  messageStore: IMessageStore;
  socket: any;
}) => {
  return (
    <>
      {messageStore.currentChatPerson ? (
        <ChatContainer socket={socket.current} />
      ) : (
        <EmptyContainer />
      )}
    </>
  );
};
