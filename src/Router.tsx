import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuthStore } from "./core/store";
import ChatContainer from "./presentations/components/ChatBox/ChatContainer";
import GroupChatContainer from "./presentations/components/ChatBox/GroupChatContainer";
import Friends from "./presentations/components/Friends/Friends";
import NotifiesContainer from "./presentations/components/Notifies/NotifiesContainer";
import Profile from "./presentations/components/Profile/Profile";
import HomePage from "./presentations/pages/HomePage";
import NotFound from "./presentations/pages/NotFound";
import SigninPage from "./presentations/pages/SigninPage";
import SignupPage from "./presentations/pages/SignupPage";

type Props = {
  socket: any;
};

const Router = (props: Props) => {
  const navigate = useNavigate();
  const access_token = useAuthStore((state) => state.access_token);
  useEffect(() => {
    if (!access_token) {
      navigate("/signin");
    }
  }, []);
  return (
    <Routes>
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<HomePage socket={props.socket.current} />}>
        <Route index path="/" element={<Friends />} />
        <Route
          path="/m/:id"
          element={<ChatContainer socket={props.socket.current} />}
        />
        <Route
          path="/g/:id"
          element={<GroupChatContainer socket={props.socket.current} />}
        />
        <Route path="/notifies" element={<NotifiesContainer />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
