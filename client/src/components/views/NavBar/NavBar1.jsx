import navBar from "./NavBar.module.css";
import Drop from "./Drop/Drop";
import { React, useState } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { home } from "../../../_actions/page_action";
import { useSelector } from "react-redux";

export default function NavBar1() {
  const [onOut, setOnOut] = useState(false);
  let navigate = useNavigate();
  const goToLogin = () => {
    navigate("./login");
  };
  const page = useSelector((state) => state.page.currentPage);
  const user = useSelector((state) => state.user);

  const [FilePath, setFilePath] = useState("");
  useEffect(() => {
    fetchUserList();
  }, []);
  const fetchUserList = () => {
    // if (page.page === "login" || page.page == "Register") {
    if (isUser) {
      setOnOut(true);
    } else {
      setOnOut(false);
    }
    axios
      .post("/api/users/getProFile", {
        userFrom: localStorage.getItem("userId"),
      })
      .then((response) => {
        if (response.data.success) {
          setFilePath(response.data.userInfo[0].proFileImg);
        } else {
          alert("유저 정보를 가져오는데 실패하였습니다.");
        }
      });
  };
  const goMyProFile = () => {
    navigate("/myProFile");
  };
  const goToLogout = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        navigate("/login");
        window.localStorage.setItem("userId", " ");
        window.localStorage.setItem("name", " ");
        alert("로그아웃 하는데 성공했습니다.");
      }
      // else {
      //   // navigate(window.history.back());
      //   alert("로그아웃 하는데 실패했습니다.");
      // }
      window.localStorage.setItem("userId", " ");
      window.localStorage.setItem("name", " ");
      navigate("/login");
    });
  };
  const dispatch = useDispatch();
  const goToHome = () => {
    dispatch(home({ page: "home" }));
    window.localStorage.setItem("onModify", false);
    window.location.reload();

    // navigate("/homeSection");
  };
  const goProfile = () => {
    navigate("/myProFile");
  };
  //로그인 여부 확인 변수
  const isUser = window.localStorage.getItem("userId") === " ";
  const currentUser = localStorage.getItem("name");

  //console.log("profileImg : ", FilePath);
  //console.log("name", currentUser);
  return (
    <div style={{ display: "flex", marginTop: "5px", marginBottom: "5px" }}>
      {onOut && (
        <div style={{ marginLeft: "1450px" }}>
          <a style={{ color: "blue", fontWeight: "bold" }} onClick={goToLogin}>
            Sign In
          </a>
        </div>
      )}
      {!onOut && (
        <div style={{ display: "flex", marginLeft: "9%" }}>
          <img
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid lightgray",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50px",
              boxShadow: "1px 1px 1px 1px inset",
            }}
            src={`http://localhost:5000/${FilePath}`}
            alt="thumbnail"
          />
          <span onClick={goProfile} style={{ marginLeft: "7px" }}>
            {currentUser}님 환영합니다.{" "}
          </span>
          <div style={{ marginLeft: "950px" }}>
            <a
              onClick={goMyProFile}
              style={{ color: "blue", fontWeight: "bold", marginLeft: "7px" }}
            >
              {" "}
              MyProFile
            </a>
            <a
              onClick={goToLogout}
              style={{ color: "blue", fontWeight: "bold", marginLeft: "7px" }}
            >
              {" "}
              Logout
            </a>
            <a
              onClick={goToHome}
              style={{ marginLeft: "20px", color: "blue", fontWeight: "bold" }}
            >
              Home
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
