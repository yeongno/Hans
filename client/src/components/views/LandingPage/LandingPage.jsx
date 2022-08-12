import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import FavoritePage from "../FavoritePage/FavoritePage";
import HomeLandering from "./HomeLandering/HomeLandering";
import { useDispatch } from "react-redux";
import { home } from "../../../_actions/page_action";

function LandingPage() {
  const dispatch = useDispatch();
  dispatch(home({ page: "home" }));

  return (
    <div>
      <HomeLandering />
      <Outlet />
    </div>
  );
}

export default LandingPage;
