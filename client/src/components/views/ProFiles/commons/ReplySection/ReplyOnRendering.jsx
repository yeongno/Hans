import { Input } from "antd";
import React from "react";
import { LightGray } from "../../../../Config";
function ReplyOnRendering(props) {
  const userFrom = props.UserFrom;
  const UserImg = props.UserImg;
  const createdAt = props.CreatedAt;
  const content = props.Content;
  const userName = props.UserName;
  return (
    <div>
      <div
        style={{
          display: "flex",
          height: "100%",
          marginBottom: "5px",
        }}
      >
        <img
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "100%",
            border: "1px solid lightgray",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "1px 1px 1px 1px inset",
          }}
          src={`http://localhost:5000/${UserImg}`}
          alt="프로필"
        />
        <div
          style={{
            borderRadius: "5px",
            width: "100%",
            marginLeft: "1%",
            lineHeight: "102%",
            paddingTop: "4px",
            paddingLeft: "4px",
          }}
        >
          <div
            style={{
              background: "#f0e6e6",
            }}
          >
            <span
              style={{
                width: "100%",
                display: "inline-block",
                fontWeight: "bold",
                paddingTop: "0px",
                marginTop: "0px",
              }}
            >
              {userName}
            </span>
            <span
              style={{
                width: "100%",
                display: "inline-block",
                paddingTop: "0px",
                marginTop: "0px",
                wordBreak: "break-all",
              }}
            >
              {content}
            </span>
          </div>

          <span style={{ background: "yellow", display: "inline-block" }}>
            asd
          </span>
        </div>
      </div>
    </div>
  );
}

export default ReplyOnRendering;
