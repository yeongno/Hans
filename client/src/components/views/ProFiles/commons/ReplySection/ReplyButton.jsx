import { MessageOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import ReplySection from "./ReplySection";

function ReplyButton(props) {
  const [replyOpen, setreplyOpen] = useState(false);
  const onReply = () => {
    setreplyOpen(true);
  };
  console.log("Button", props.postFrom);
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      <Button
        style={{ width: "100%", border: "none", position: "relative" }}
        onClick={onReply}
      >
        <MessageOutlined />
        댓글 달기
      </Button>
      <Modal
        title="댓글창"
        centered
        visible={replyOpen}
        onCancel={() => setreplyOpen(false)}
        footer=""
        width="80%"
      >
        <ReplySection postFrom={props.postFrom} />
      </Modal>
    </div>
  );
}

export default ReplyButton;
