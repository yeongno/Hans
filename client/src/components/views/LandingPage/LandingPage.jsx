import React, { useEffect } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const mongoose = require("mongoose");
function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response));
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default LandingPage;
