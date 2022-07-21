import React, { useState } from "react";

import { styles } from "../styles";

import { LoadingOutlined } from "@ant-design/icons";

import Chatter from "../Chatter";

import axios from "axios";

const EmailForm = (props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function getOrCreateUser(callback) {
    axios
      .put(
        "https://api.chatengine.io/users/",
        {
          username: email,
          secret: email,
          email: email,
        },
        { headers: { "Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY } }
      )
      .then((r) => callback(r.data))
      .then(console.log("2313"));
  }
  function getOrCreateChat(callback) {
    axios
      .put(
        "https://api.chatengine.io/chats/",
        {
          usernames: ["Adam La Morre", email],
          is_direct_chat: true,
        },
        { headers: { "Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY } }
      )
      .then((r) => callback(r.data))
      .then(console.log("getOrCreateChat"));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    console.log("Sending email", email);

    getOrCreateUser((user) => {
      getOrCreateChat((chat) => console.log("success", chat));
    });
  }

  return (
    <div
      style={{
        ...styles.emailFormWindow,
        ...{
          height: "100%",
          opacity: "1",
        },
      }}
    >
      <div style={{ height: "0px" }}>
        <div style={styles.stripe} />
      </div>

      <div
        className="transmition-5"
        style={{
          ...styles.loadingDiv,
          ...{
            zIndex: loading ? "10" : "-1",
            opacity: loading ? "0.33" : "0",
          },
        }}
      />
      <LoadingOutlined
        className="transition-5"
        style={{
          ...styles.loadingIcon,
          ...{
            zIndex: loading ? "10" : "-1",
            opacity: loading ? "1" : "0",
            fontSize: "82px",
            top: "calc(50% - 41px)",
            left: "calc(50% - 41px)",
          },
        }}
      />
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Chatter
          style={{
            position: "relative",
            left: "calc(50% - 44px)",
            top: "10%",
          }}
        />
        <div style={styles.topText}>
          채팅에 오신걸 환영합니다 <br />
        </div>

        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{ position: "relative", width: "100%", top: "19.75%" }}
        >
          <input
            style={styles.emailInput}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
          />
        </form>
        <div style={styles.bottomText}>
          Enter Your Email <br /> To Get Started.
        </div>
      </div>
    </div>
  );
};
export default EmailForm;
