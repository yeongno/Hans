import { MessageOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import ReplySection from "./ReplySection";

function ReplyButton(props) {
  const [replyOpen, setreplyOpen] = useState(false);
  const onReply = () => {
    setreplyOpen(true);
  };
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
        title="Modal 1000px width"
        centered
        visible={replyOpen}
        onOk={() => setreplyOpen(false)}
        onCancel={() => setreplyOpen(false)}
        width={1000}
      >
        <ReplySection />
      </Modal>
    </div>
  );
}

export default ReplyButton;
