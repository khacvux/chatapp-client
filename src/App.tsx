import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { ThemeTypes } from "./core/dtos";
import { useAuthStore, useFriendStore, useMessageStore } from "./core/store";
import { useGroupMessageStore } from "./core/store/groupMessageStore";
import { usePreferenceStore } from "./core/store/preferenceStore";
import ChatContainer from "./presentations/components/ChatBox/ChatContainer";
import GroupChatContainer from "./presentations/components/ChatBox/GroupChatContainer";
import Friends from "./presentations/components/Friends/Friends";
import NotifiesContainer from "./presentations/components/Notifies/NotifiesContainer";
import Profile from "./presentations/components/Profile/Profile";
import HomePage from "./presentations/pages/HomePage";
import NotFound from "./presentations/pages/NotFound";
import SigninPage from "./presentations/pages/SigninPage";
import SignupPage from "./presentations/pages/SignupPage";
import { BASE_URL } from "./utils";



const audio = new Audio("/messenger_web.mp3")


function App() {
  const preferenceStore = usePreferenceStore();
  const messageStore = useMessageStore();
  const groupMessageStore = useGroupMessageStore();
  const socket = useRef<Socket | undefined>();
  const access_token = useAuthStore((state) => state.access_token);
  const friendStore = useFriendStore();

  useEffect(() => {
    if (access_token.length) {
      socket.current = io(BASE_URL, {
        extraHeaders: {
          access_token: access_token,
        },
      });
      friendStore.fetchFriendRequests(access_token);
      groupMessageStore.fetchMyGroups(access_token);
    }
  }, [access_token]);


  useEffect(() => {
    socket.current?.on("receiveMessage", (data) => {
      audio.play();
      messageStore.pushMessageItem(data.message);
    });
  }, []);

  useEffect(() => {
    if (preferenceStore.theme == ThemeTypes.System) {
      preferenceStore.setSystemTheme();
    }
  }, [preferenceStore.theme]);

  return (
    <div
      className={`${
        preferenceStore.theme == ThemeTypes.System
          ? preferenceStore.systemTheme
          : preferenceStore.theme
      }`}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage socket={socket.current} />}>
            <Route index path="/" element={<Friends />} />
            <Route
              path="/m/:id"
              element={<ChatContainer socket={socket.current} />}
            />
            <Route
              path="/g/:id"
              element={<GroupChatContainer socket={socket.current} />}
            />
            <Route path="/notifies" element={<NotifiesContainer />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
