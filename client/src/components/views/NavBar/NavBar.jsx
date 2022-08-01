import navBar from "./NavBar.module.css";
import Drop from "./Drop/Drop";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NavBar() {
  let navigate = useNavigate();
  const goToLogin = () => {
    navigate("./login");
  };
  const goToLogout = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        navigate("./login");
        window.localStorage.setItem("userId", " ");
        alert("로그아웃 하는데 성공했습니다.");
      } else {
        navigate("./login");
        alert("로그아웃 하는데 실패했습니다.");
      }
    });
  };
  const goToRegister = () => {
    navigate("./register");
  };
  const goToHome = () => {
    navigate("/");
  };
  return (
    <div className={navBar.body}>
      <div className={navBar.navBar}>
        <div className={navBar.navBar_inner}>
          <div className={navBar.sub_menu}>
            <ul className={navBar.menu}>
              <li>
                <a onClick={goToLogin}>Sign In</a>
              </li>
              <li>
                <a onClick={goToLogout}>Logout</a>
              </li>
              <li>
                <a onClick={goToRegister}>Register</a>
              </li>
              <li>
                <a onClick={goToHome}>Home</a>
              </li>
            </ul>
            <div className={navBar.search}>
              <input type="text" />
              <div className={navBar.icon}></div>
            </div>
          </div>
          <Drop />
        </div>
      </div>
    </div>
  );
}
