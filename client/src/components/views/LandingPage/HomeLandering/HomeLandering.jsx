import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
import NavBar1 from "../../NavBar/NavBar1";
import PageLabel from "../../PageLabel/PageLabel";
import HomeSection from "./HomeSection";

function HomeLandering() {
  const page = useSelector((state) => state.page);
  // const [onModify, setModify] = useState(false);
  // const [onHandler, setOnHandler] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(page.myModify);

    const onHnadler = true;
    if (onHnadler) {
      navigate("/homeSection");
    }
  }, [1]);

  return (
    <div>
      {/* <NavBar /> */}
      <NavBar1 />
      <PageLabel />
    </div>
  );
}

export default HomeLandering;
