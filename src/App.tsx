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
      {/* <div className=" text-red-600">
        <p>token: {token}</p>
        <p>email: {email}</p>
        <button 
          onClick={() => updateAuth({token: "3sflfjlksj", username: "John", email: "John@gmail.com"})}>
          add
        </button>

        <button 
          onClick={() => clearAuth()}>
          clear
        </button>
        
      </div> */}
    </BrowserRouter>
  );
}

export default App;
