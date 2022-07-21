import React, { useState } from "react";

import { styles } from "./styles";

const Chatter = (props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={props.style}>
      <div
        className="transmition-3"
        style={{
          ...styles.avatarHello,
          ...{ opacity: hovered ? "1" : "0" },
        }}
      >
        Hello
      </div>

      <div
        className="transmition-3"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => props.onClick && props.onClick()}
        style={{
          ...styles.chatWithMeButton,
          ...{ border: hovered ? "1px solid #f9f0ff" : "4px solid #7a39e0" },
        }}
      />
    </div>
  );
};

export default Chatter;
