import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../App.css";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import Auth from "../hoc/auth";
import PostPage from "./views/PostPage/PostPage";

function App() {
  const LandingPage1 = Auth(LandingPage, null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage1 />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/post" element={<PostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
