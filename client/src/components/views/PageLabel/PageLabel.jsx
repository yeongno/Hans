import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Home from "./Home";
import Login from "./Login";
import MyProFile from "./MyProFile";
import ProFile from "./ProFile";
import Register from "./Register";

function PageLabel() {
  const [first, setfirst] = useState(true);
  useEffect(() => {}, []);

  const page = useSelector((state) => state.page.currentPage);
  console.log(page);

  return (
    <div style={{ width: "100%", height: "100px", background: "#039ac5" }}>
      {page.page === "home" && <Home />}
      {page.page === "myProFile" && <MyProFile />}
      {page.page === "proFile" && <ProFile />}
      {page.page === "Register" && <Register />}
      {page.page === "login" && <Login />}
    </div>
  );
}

export default PageLabel;
