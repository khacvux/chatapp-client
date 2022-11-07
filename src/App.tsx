import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useAuthStore } from "./core/store";
import HomePage from "./presentations/pages/HomePage";
import SigninPage from "./presentations/pages/SigninPage";

function App() {
  const { access_token, email } = useAuthStore((state) => ({
    access_token: state.access_token,
    email: state.email,
  }));
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SigninPage />} />
        {/* <Route path="/signin" element={<SignupP} /> */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
