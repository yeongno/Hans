import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTopic, topicGo } from "../_actions/post_action";
import axios from "axios";

function TopicManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Topics, setTopics] = useState([]);
  //토픽 내용(토픽 등록)
  const [Topic, setTopic] = useState("");

  useEffect(() => {
    fetchTopicList();
  }, []);
  const fetchTopicList = () => {
    dispatch(getTopic({ type: "TOPIC" })).then((response) => {
      if (response.payload.success) {
        setTopics(response.payload.topics);
      } else {
        alert("Load Error");
      }
    });
  };
  //토픽 등록 핸들러
  const onTSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Topic", Topic);
    let body = {
      topicName: Topic,
    };
    dispatch(topicGo(body)).then((response) => {
      if (response.payload.success) {
        alert("Successed to topic up");
        fetchTopicList();
        console.log(response);
      } else {
        console.log(response.payload);
        alert("Failed to topic up");
      }
    });
  };
  //댓글 삭제
  const onClickDelete = (topic) => {
    //삭제 확인창
    if (window.confirm("토픽을 삭제하시겠습니까?")) {
      const variables = {
        topic,
      };
      axios.post("/api/topics/removeTopic", variables).then((response) => {
        if (response.data.success) {
          fetchTopicList();
        } else {
          alert("토픽을 지우는데 실패 했습니다.");
        }
      });
    }
  };

  const onTopic = (event) => {
    setTopic(event.currentTarget.value);
  };
  const renderTopics = Topics.map((topics, index) => {
    return (
      <tr key={index}>
        <td>{topics.topicName}</td>
        <td>
          <button onClick={() => onClickDelete(topics.topicName)}>삭제</button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <h2>Topic Management(Beta)</h2>
          </tr>
        </thead>
        <tbody>{renderTopics}</tbody>
      </table>
      <form>
        <input type="text" size="20" onChange={onTopic} value={Topic}></input>
        <br />
        <button onClick={onTSubmitHandler}>등록</button>
      </form>
    </div>
  );
}

export default TopicManagement;
