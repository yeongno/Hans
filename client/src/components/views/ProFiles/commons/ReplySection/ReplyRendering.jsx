import axios from "axios";
import React, { useEffect, useState } from "react";
import ReplyOnRendering from "./ReplyOnRendering";

function ReplyRendering(props) {
  const [UserImg, setUserImg] = useState("");
  const [UserName, setUserName] = useState("");
  const [UserFrom, setUserFrom] = useState("");
  const [Content, setContents] = useState("");
  const [CreatedAt, setDate] = useState("");
  const [OnReply, setOnReply] = useState(false);

  useEffect(() => {
    fetchUserList();
  }, []);
  const fetchUserList = () => {
    axios
      .post("/api/reply/getReply", {
        postFrom: props.reply.postFrom,
      })
      .then((response) => {
        if (response.data.req[0]) {
          console.log(response.data.req);
          setUserImg(response.data.req[0].proFileImg);
          setUserName(response.data.req[0].userName);
          setUserFrom(response.data.req[0].userFrom);
          setContents(response.data.req[0].content);
          setDate(response.data.req[0].createdAt);
          setOnReply(true);
          console.log("req", response.data.req);
          console.log("postFrom", props.reply.postFrom);
        } else {
          setOnReply(false);
          console.log("nope");
        }
      });
  };
  return (
    <div>
      {OnReply && (
        <ReplyOnRendering
          UserFrom={UserFrom}
          UserImg={UserImg}
          CreatedAt={CreatedAt}
          Content={Content}
          UserName={UserName}
        />
        // <img
        //   style={{
        //     width: "5%",
        //     height: "5%",
        //     border: "1px solid lightgray",
        //     alignItems: "center",
        //     justifyContent: "center",
        //     borderRadius: "50px",
        //     boxShadow: "1px 1px 1px 1px inset",
        //   }}
        //   src={`http://localhost:5000/${UserImg}`}
        //   alt="프로필"
        // />
      )}
    </div>
  );
}

export default ReplyRendering;