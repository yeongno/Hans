import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../App.css";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import Auth from "../hoc/auth";
import MoviePage from "./views/MoviePage/MoviePage";
import MovieDetail from "./views/MoviePage/MovieDetail/MovieDetail";
import FavoritePage from "./views/FavoritePage/FavoritePage";
import PostList from "./views/PostPage/PostList";
import PostPage from "./views/PostPage/PostPage";
import PostUpdatePage from "./views/PostPage/PostUpdatePage";
import DetailPost from "./views/PostPage/DetailPost";
import MyFavoriteList from "./views/PostPage/MyFavoriteList";
import TopicManagementPage from "../topic/TopicManagement";
import MyProfile from "./views/ProFiles/MyProfile";
import ProFileList from "./views/ProFiles/ProFileList";
import ProFile from "./views/ProFiles/ProFile";
import ModiFyProFile from "./views/ProFiles/ModifyProFile";
import Buttons from "./views/ProFiles/commons/Buttons";
import HomeSection from "./views/LandingPage/HomeLandering/HomeSection";
function App() {
  const LandingPage1 = Auth(LandingPage, null);
  const LoginPage1 = Auth(LoginPage, null);
  const RegisterPage1 = Auth(RegisterPage, null);
  const MoviePage1 = Auth(MoviePage, true);
  const MovieDetail1 = Auth(MovieDetail, true);
  const FavoritePage1 = Auth(FavoritePage, true);
  const MyFavoriteList1 = Auth(MyFavoriteList, true);
  const TopicManagementPage1 = Auth(TopicManagementPage, true);
  const MyProfile1 = Auth(MyProfile, true);
  const ProFileList1 = Auth(ProFileList, true);
  const ProFile1 = Auth(ProFile, true);
  const ModiFyProFile1 = Auth(ModiFyProFile, true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage1 />}>
          <Route path="login" element={<LoginPage1 />} />
          <Route path="/register" element={<RegisterPage1 />} />
          <Route path="/postList" element={<PostList />} />
          <Route path="/myFavoriteList" element={<MyFavoriteList1 />} />
          <Route path="/PostPage" element={<PostPage />} />
          <Route path="/PostUpdatePage" element={<PostUpdatePage />} />
          <Route path="/PostPage/:postId" element={<DetailPost />} />
          <Route path="/movie" element={<MoviePage1 />} />
          <Route path="/favorite" element={<FavoritePage1 />} />
          <Route path="/topic" element={<TopicManagementPage1 />} />
          <Route path="/movie/:movieId" element={<MovieDetail1 />} />
          <Route path="/proFileList" element={<ProFileList1 />} />
          <Route path="/:profileId" element={<ProFile1 />} />
          <Route path="/myProFile" element={<MyProfile1 />} />
          <Route path="/modifyProFile" element={<ModiFyProFile1 />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/homeSection" element={<HomeSection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
