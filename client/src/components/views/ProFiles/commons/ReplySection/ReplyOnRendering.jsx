import React from "react";

function ReplyOnRendering(props) {
  const userFrom = props.UserFrom;
  const UserImg = props.UserImg;
  const createdAt = props.CreatedAt;
  const content = props.Content;
  const userName = props.UserName;
  return (
    <div>
      <div style={{ display: "flex" }}>
        <img
          style={{
            width: "10%",
            height: "10%",
            borderRadius: "100%",
            border: "1px solid lightgray",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "1px 1px 1px 1px inset",
          }}
          src={`http://localhost:5000/${UserImg}`}
          alt="프로필"
        />
      </div>

      <span>{userFrom}</span>
      <span>{createdAt}</span>
      <span>{content}</span>
      <span>{userName}</span>
    </div>
  );
}

export default ReplyOnRendering;
