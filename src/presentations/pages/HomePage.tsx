import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "../../core/store";
import { useMessageStore } from "../../core/store/messageStore";
import { BASE_URL } from "../../utils";
import ChatContainer from "../components/ChatContainer.tsx/ChatContainer";
import EmptyContainer from "../components/ChatContainer.tsx/EmptyContainer";
import ContactsContainer from "../components/ContactContainer/ContactsContainer";

export default function HomePage() {
  const access_token = useAuthStore((state) => state.access_token);
  const socket = useRef<Socket | undefined>();
  const messageStore = useMessageStore((state) => state);
  const navigate = useNavigate();
  if (!access_token) {
    navigate("/signin");
  }

  useEffect(() => {
    if (access_token) {
      socket.current = io(BASE_URL, {
        extraHeaders: {
          access_token: access_token,
        },
      });
      messageStore.fetchListContact(access_token);
    }
  }, [access_token]);

  return (
    <div className=" w-full h-screen flex flex-row overflow-hidden">
      <div className=" w-[90px] lg:w-[360px] h-full">
        <ContactsContainer />
      </div>
      <div className=" flex-1 h-full lg:w-full w-chat-container">
        {messageStore.currentChatPerson ? (
          <ChatContainer socket={socket.current} />
        ) : (
          <EmptyContainer />
        )}
      </div>
    </div>
  );
}
