import navBar from "./NavBar.module.css";
import Drop from "./Drop/Drop";
import { React, useState } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function NavBar() {
  let navigate = useNavigate();
  const goToLogin = () => {
    navigate("./login");
  };

  const [FilePath, setFilePath] = useState("");
  useEffect(() => {
    fetchUserList();
  }, []);
  const fetchUserList = () => {
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

  const goToLogout = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        navigate("./login");
        window.localStorage.setItem("userId", " ");
        window.localStorage.setItem("name", " ");
        alert("로그아웃 하는데 성공했습니다.");
      } else {
        navigate(window.history.back());
        alert("로그아웃 하는데 실패했습니다.");
      }
    });
  };
  const goToHome = () => {
    navigate("/homeSection");
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
    <div className={navBar.body}>
      <div className={navBar.navBar}>
        <div className={navBar.navBar_inner}>
          <div className={navBar.sub_menu}>
            <ul className={navBar.menu}>
              {isUser && (
                <li>
                  <a onClick={goToLogin}>Sign In</a>
                </li>
              )}
              {!isUser && (
                <>
                  <li>
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
                  </li>
                  <li onClick={goProfile}>
                    <a>{currentUser}</a>
                  </li>
                  <li>
                    <a onClick={goToLogout}>Logout</a>
                  </li>
                </>
              )}
              <li>
                <a onClick={goToHome}>Home</a>
              </li>
            </ul>
            {/* <div className={navBar.search}>
              <input type="text" />
              <div className={navBar.icon}></div>
            </div> */}
          </div>
          <Drop />
        </div>
      </div>
    </div>
  );
}
