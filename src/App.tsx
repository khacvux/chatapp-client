import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ThemeTypes } from "./core/dtos";
import { usePreferenceStore } from "./core/store/preferenceStore";
import HomePage from "./presentations/pages/HomePage";
import SigninPage from "./presentations/pages/SigninPage";
import SignupPage from "./presentations/pages/SignupPage";

function App() {
  const preferenceStore = usePreferenceStore();
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
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
