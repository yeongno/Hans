import { DownOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, message, Modal, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Modify from "./Modify";

function DropDown(props) {
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const postFrom = props.postFrom;
  const title = props.title;
  const content = props.content;
  const topic = props.topic;

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
        if (response.data.success) message.success("게시글을 삭제하였습니다.");
      });
    axios.post("/api/favoriteList/removeFavorite", {
      postFrom: props.postFrom,
      userFrom: localStorage.getItem("userId"),
    });

    axios.post("/api/reply/removeReply", {
      postFrom: props.postFrom,
      userFrom: localStorage.getItem("userId"),
    });
    window.localStorage.setItem("onModify", true);
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
        {
          type: "divider",
        },
        {
          label: (
            <Link to={`/postPage/${props.postFrom}`}>
              <label>게시글 상세보기</label>
            </Link>
          ),
          key: "2",
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
          topic={props.topic}
        />{" "}
      </Modal>
    </div>
  );
}

export default DropDown;
