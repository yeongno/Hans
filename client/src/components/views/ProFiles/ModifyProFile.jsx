import { Button, Col, Divider, Form, Input, Row, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Buttons from "./commons/Buttons";
import { UserOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/AntdIcon";
import { useDispatch } from "react-redux";

function ModifyProFile(props) {
  const dispatch = useDispatch();
  const [Name, setName] = useState();
  const [Email, setEmail] = useState();
  const [formErrorMessage, setFormErrorMessage] = useState("");

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = () => {
    axios
      .post("/api/users/getProFile", {
        userFrom: localStorage.getItem("userId"),
      })
      .then((response) => {
        if (response.data.success) {
          setName(response.data.userInfo[0].name);
          setEmail(response.data.userInfo[0].email);
        } else {
          alert("유저 정보를 가져오는데 실패하였습니다.");
        }
      });
  };
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const submitName = () => {
    axios
      .post("/api/users/updateName", {
        _id: window.localStorage.getItem("userId"),
        name: Name,
      })
      .then(function (response) {
        if (response.data.success) {
          alert("Name 변경이 완료 되었습니다.");
        } else {
          alert("Name을 다시 한번 확인해 주십시오");
        }
      });
  };
  return (
    <div>
      <Buttons />
      <div style={{ width: "85", margin: "3rem auto" }}>
        <h2>Modify Your ProFile</h2>
        <hr />
        <Divider orientation="left">개인 정보 변경</Divider>
        <Row justify="center" style={{ margin: 10 }}>
          <Col span={15}>
            <Input.Group>
              <Input
                addonBefore="Name"
                style={{ width: "calc(50%)" }}
                placeholder="Name"
                onChange={onChangeName}
                value={Name}
              />
              <Button type="primary" onClick={submitName}>
                확인
              </Button>
            </Input.Group>
          </Col>
        </Row>
        <Row justify="center" style={{ margin: 10 }}>
          <Col span={15}>
            <Input.Group>
              <Input
                addonBefore="Email"
                style={{ width: "calc(50%)" }}
                placeholder="Email"
                onChange={onChangeEmail}
                value={Email}
              />
              <Button type="primary">중복 확인</Button>
            </Input.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default ModifyProFile;
