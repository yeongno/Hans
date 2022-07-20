import React, { useEffect } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

function LandingPage() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default LandingPage;
