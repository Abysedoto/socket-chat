import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import { Drawer } from "antd";
import "antd/dist/antd.css";
import ".././index.css";
import socket from "../socket";
import Loading from "./Loading";

const ChatRoom = (props) => {
  const [messageText, setMessageText] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  let permissionToChange = false;
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current.scrollTo(0, 9999999)
  }

  useEffect(scrollToBottom, [props.messageData]);
  useEffect(() => {
    permissionToChange = true
    socket.on("setOnlineUsers", (users) => {
      props.setOnlineUsers(users);
    });
    socket.on("setMessageData", (messages) => {
      props.setMessageData(messages);
      if (permissionToChange) {
        setLoading(true);
        scrollToBottom()
      }
    });
    return () => permissionToChange = false;
  }, []);
  const sendMessage = () => {
    socket.emit("sendMessage", {
      roomId: props.userData.roomId,
      messageText,
      name: props.userData.name,
    });
    setMessageText("");
  };
  const sendMessageEnter = (e) => {
    if (e.code !== "Enter") {
      return;
    }
    e.preventDefault();
    socket.emit("sendMessage", {
      roomId: props.userData.roomId,
      messageText,
      name: props.userData.name,
    });
    setMessageText("");
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const onMessageText = (e) => {
    setMessageText(e.target.value);
  };
  const leaveFromRoom = () => {
    socket.emit("leave", props.userData.roomId);
    props.changeIsJoinFalse();
  };
  return (
    <>
      <Drawer
        style={{
          fill: "white",
        }}
        headerStyle={{
          backgroundColor: "#272c33",
          border: "0",
        }}
        bodyStyle={{
          backgroundColor: "#272c33",
          color: "white",
          fontSize: "18px",
        }}
        className="chat-room-drawer"
        getContainer={false}
        title="Online"
        placement="bottom"
        onClose={onClose}
        visible={visible}
      >
        {props.onlineUsers.map((name, index) => (
          <div className="chat-room-drawer-online-user" key={index}>
            {name}
            <div className="chat-room-drawer-online-circle"></div>
          </div>
        ))}
      </Drawer>
      <div className="chat-room">
        <div className="chat-room-header">
          <button onClick={leaveFromRoom} className="chat-room-header-btn">
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <metadata>
                Created by potrace 1.16, written by Peter Selinger 2001-2019
              </metadata>
              <g
                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#0C897A"
                stroke="none"
              >
                <path
                  d="M1070 3535 l-975 -975 977 -977 978 -978 132 133 133 132 -688 688
-687 687 0 53 0 52 2090 0 2090 0 0 210 0 210 -2090 0 -2090 0 0 52 0 53 687
687 688 688 -130 130 c-71 71 -132 130 -135 130 -3 0 -444 -439 -980 -975z"
                />
              </g>
            </svg>
          </button>
          <h2 className="chat-room-header-title">Комната: {props.userData.roomId}</h2>
          <button className="chat-room-header-online-btn" onClick={showDrawer}>
            Online <div className="chat-room-header-online-btn-circle"></div>
          </button>
        </div>
        <div className="chat-room-messages" ref={messagesEndRef}>
          {loading ? (
            <>
              {props.messageData.map((user, index) => {
                if (user.userId === socket.id) {
                  return (
                    <div key={index} className="chat-room-my-message">
                      <h3 className="chat-room-my-message-name">{user.name}</h3>
                      <p className="chat-room-my-message-text">{user.messageText}</p>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="chat-room-whose-message">
                      <h3 className="chat-room-my-message-name">{user.name}</h3>
                      <p className="chat-room-my-message-text">{user.messageText}</p>
                    </div>
                  );
                }
              })}
            </>
          ) : (
            <Loading />
          )}
        </div>
        <div className="chat-room-field" style={{ float:"left", clear: "both" }}>
          <TextField
            onKeyDown={sendMessageEnter}
            onChange={onMessageText}
            value={messageText}
            maxLength="790"
            label="Message"
            fullWidth
            multiline
            color="success"
            inputProps={{ maxLength: 790 }}
            InputProps={{
              endAdornment: (
                <button
                  onClick={sendMessage}
                  className="chat-room-sendMessage-btn"
                >
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px"
                    height="20px"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <metadata>
                      Created by potrace 1.16, written by Peter Selinger
                      2001-2019
                    </metadata>
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      stroke="none"
                    >
                      <path
                        d="M232 4620 c-47 -29 -72 -76 -72 -135 0 -27 73 -414 162 -859 171
             -855 170 -850 233 -887 20 -12 192 -45 502 -96 260 -43 473 -80 473 -83 0 -3
             -213 -40 -473 -83 -310 -51 -482 -84 -502 -96 -63 -37 -62 -32 -233 -887 -89
             -445 -162 -831 -162 -859 0 -94 62 -155 157 -155 46 0 283 99 2305 966 1239
             531 2263 972 2276 980 83 54 83 214 0 268 -13 8 -1037 449 -2276 980 -2022
             867 -2259 966 -2305 966 -34 0 -63 -7 -85 -20z"
                      />
                    </g>
                  </svg>
                </button>
              ),
            }}
            maxRows="6"
            sx={{
              "& label.Mui-focused": {
                color: "#0C897A",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "yellow",
              },
              "& .MuiOutlinedInput-root": {
                color: "white",
                backgroundColor: "#272c33",
                "& fieldset": {
                  borderColor: "#0C897A",
                },
                "&:hover fieldset": {
                  borderColor: "#0C897A",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0C897A",
                },
                "& placeholder": {
                  color: "white",
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
