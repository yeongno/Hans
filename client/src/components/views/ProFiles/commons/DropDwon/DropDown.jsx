import { DownOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space } from "antd";
import axios from "axios";
import React, { useEffect } from "react";

function DropDown(props) {
  useEffect(() => {}, []);

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
  const menu = (
    <Menu
      items={[
        {
          label: <a onClick={onDelete}>Delete</a>,
          key: "0",
        },
        {
          label: <a href="https://www.aliyun.com">2nd menu item</a>,
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: "3rd menu item",
          key: "3",
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
    </div>
  );
}

export default DropDown;
