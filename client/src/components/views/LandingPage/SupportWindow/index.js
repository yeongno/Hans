import React from "react";
import LandingPage from "../LandingPage";

import { styles } from "../styles";

import EmailForm from "./EmailForm";

const SupportWindow = (props) => {
  return (
    <div
      style={{
        ...styles.supportWindow,
        ...{ opacity: props.visible ? "1" : "0" },
      }}
    >
      <EmailForm />
    </div>
  );
};

export default SupportWindow;
