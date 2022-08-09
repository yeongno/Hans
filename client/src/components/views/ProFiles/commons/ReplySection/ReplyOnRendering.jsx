import { Input } from "antd";
import React from "react";
import { LightGray } from "../../../../Config";
import moment from "moment";
import "moment/locale/ko";
function ReplyOnRendering(props) {
  const userFrom = props.UserFrom;
  const UserImg = props.UserImg;
  const createdAt = props.CreatedAt;
  const content = props.Content;
  const userName = props.UserName;
  const createdDate = moment(createdAt);

  return (
    <div>
      <div
        style={{
          display: "flex",
          height: "100%",
          marginBottom: "5px",
          width: "100%",
        }}
      >
        <img
          style={{
            width: "35px",
            height: "35px",
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
            width: "90%",
            marginLeft: "1%",
            lineHeight: "102%",
          }}
        >
          <div
            style={{
              borderRadius: "7px",
              background: "#f0e6e6",
              padding: "5px 5px 5px 5px",
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

          <span
            style={{
              display: "inline-block",
              color: "#808080",
              fontSize: "4px",
            }}
          >
            {moment(createdDate).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ReplyOnRendering;
