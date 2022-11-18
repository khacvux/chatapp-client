import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { useAuthStore, useFriendStore } from "../../core/store";
import ContactsContainer from "../components/ContactContainer/ContactsContainer";
import Overlays from "./Overlays";

export default function HomePage({
  socket,
}: {
  socket: Socket | undefined;
}) {
  const access_token = useAuthStore((state) => state.access_token);
  const friendStore = useFriendStore();
  const navigate = useNavigate();

  if (access_token.length <= 0) {
    navigate("/signin");
  }

  useEffect(() => {
    friendStore.fetchListFriend(access_token);
  }, [friendStore.listFriendRequest.length]);

  return (
    <div className="w-full h-screen relative">
      <div className=" w-full h-screen flex flex-row overflow-hidden">
        <div className=" w-[90px] lg:w-[360px] h-full z-[2]">
          <ContactsContainer socket={socket} />
        </div>
        <div className=" flex-1 h-full lg:w-full w-chat-container z-[1] dark:bg-[#242526]">
          <Outlet />
        </div>
      </div>
      <Overlays />
    </div>
  );
}
