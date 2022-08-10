import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import FavoritePage from "../FavoritePage/FavoritePage";
import HomeLandering from "./HomeLandering/HomeLandering";

function LandingPage() {
  return (
    <div>
      <HomeLandering />
      <Outlet />
    </div>
  );
}

export default LandingPage;
