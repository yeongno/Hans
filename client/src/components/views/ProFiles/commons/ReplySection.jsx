import { MessageOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useState } from "react";

function ReplySection() {
  const [replyOpen, setreplyOpen] = useState(false);
  const onReply = () => {
    setreplyOpen(true);
  };
  return (
    <div
      style={{
        background: "yellow",
        width: "100%",
        position: "relative",
        height: "500px",
      }}
    ></div>
  );
}
export default ReplySection;
