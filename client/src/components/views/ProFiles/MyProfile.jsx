import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOnePost, getPost } from "../../../_actions/post_action";

function MyProFile() {
  const [Name, setName] = useState();
  const [Email, setEmail] = useState();

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

  return (
    <div>
      <div style={{ width: "85", margin: "3rem auto" }}>
        <h2>My ProFile</h2>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Name : {Name} </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Email : {Email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default MyProFile;
