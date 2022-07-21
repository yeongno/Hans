import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Chatter from "./Chatter";
import SupportWindow from "./SupportWindow";

function LandingPage() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response));
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref}>
      <NavBar />
      <SupportWindow visible={visible} />
      <Chatter
        onClick={() => setVisible(true)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
        }}
      />
      <Outlet />
    </div>
  );
}

export default LandingPage;
