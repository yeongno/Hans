import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addFriendGo } from "../../../_actions/post_action";

function ProFileList() {
  const dispatch = useDispatch();

  const [Users, setUsers] = useState([]);
  const userFrom = localStorage.getItem("userId");
  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = () => {
    axios.get("/api/users/getUsers").then((response) => {
      if (response.data.success) {
        setUsers(response.data.userInfo);
      } else {
        alert("유저 목록을 불러오는데 실패 하였습니다.");
      }
    });
  };
  //   axios.post("/api/posts/removePost", variables).then((response) => {
  //     if (response.data.success) {
  //       fetchPostList();
  //     } else {
  //       alert("리스트에서 지우는데 실패 했습니다.");
  //     }
  //   });

  const renderCards = Users.map((users, index) => {
    return (
      <tr key={index}>
        <td>{users.name}</td>
        <td>{users.email}</td>
        <td>
          {/* <button onClick={() => onClickArticle(posts.title, posts.userFrom)}> */}
          <Link to={`/${users._id}`}>
            <button>유저 보기</button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div style={{ width: "85", margin: "3rem auto" }}>
        <h2>유저 목록</h2>
        <hr />
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>email</th>
              <th>Click the button</th>
            </tr>
          </thead>
          <tbody>{renderCards}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ProFileList;
