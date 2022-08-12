import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
import HomeSection from "./HomeSection";

function HomeLandering() {
  const [onHandler, setOnHandler] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const onHnadler = true;
    if (onHnadler) {
      navigate("/homeSection");
    }
  }, [1]);

  return (
    <div>
      <NavBar />
    </div>
  );
}

export default HomeLandering;
