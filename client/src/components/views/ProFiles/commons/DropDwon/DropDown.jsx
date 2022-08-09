import { DownOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, message, Modal, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Modify from "./Modify";

function DropDown(props) {
  useEffect(() => {}, []);
  const postFrom = props.postFrom;
  const title = props.title;
  const content = props.content;
  console.log({ title }, " ", { content });

  const [OnModal, setOnModal] = useState(false);
  const onCancel = () => {
    setOnModal(false);
    message.success("임시저장 되었습니다.");
  };
  const onDelete = () => {
    axios
      .post("/api/posts/removeOnePost", {
        _id: props.postFrom,
      })
      .then((response) => {
        if (response.data.success) console.log("success RemovePost");
      });
    axios
      .post("/api/favoriteList/removeFavorite", {
        postFrom: props.postFrom,
        userFrom: localStorage.getItem("userId"),
      })
      .then((response) => {
        if (response.data.success) console.log("success RemoveFavorite");
      });
    axios
      .post("/api/reply/removeReply", {
        postFrom: props.postFrom,
        userFrom: localStorage.getItem("userId"),
      })
      .then((response) => {
        if (response.data.success) console.log("success RemoveReply");
      });
    window.location.reload();
  };

  const onModify = () => {
    setOnModal(true);
  };
  const menu = (
    <Menu
      items={[
        {
          label: <a onClick={onDelete}>게시글 삭제하기</a>,
          key: "0",
        },
        {
          type: "divider",
        },
        {
          label: <a onClick={onModify}>게시글 수정하기</a>,
          key: "1",
        },
      ]}
    />
  );
  return (
    <div>
      <Dropdown placement="bottomRight" overlay={menu} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Button style={{ border: "none" }}>
            <EllipsisOutlined />
          </Button>
        </a>
      </Dropdown>
      <Modal
        title="수정하기"
        centered
        visible={OnModal}
        onCancel={() => onCancel()}
        footer=""
        width="80%"
        height="60%"
      >
        <Modify
          // postFrom={props.postFrom}
          // title={props.title}
          // content={props.content}
          postFrom={postFrom}
          title={props.title}
          content={props.content}
        />{" "}
      </Modal>
    </div>
  );
}

export default DropDown;
