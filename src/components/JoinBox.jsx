import React, { useState, useEffect } from "react";
import socket from "../socket";

const JoinBox = (props) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    socket.on('test', (data) => {console.log(data)})
  }, [])
  const changeRoomIdArea = (e) => {
    setRoomId(e.target.value);
  };
  const changeNameArea = (e) => {
    setName(e.target.value);
  };
  const joinToRoom = (e) => {
    e.preventDefault()
    props.changeIsJoinTrue()
    if (name === "") {
      props.setUserData({roomId, name: 'Anonim'})
      socket.emit('join', {roomId, name: 'Anonim'})
      return
    }
    props.setUserData({roomId, name})
    socket.emit('join', {roomId, name})
  }
  const joinToRoomEnter = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault()
      props.changeIsJoinTrue()
      if (name === "") {
        props.setUserData({roomId, name: 'Anonim'})
        socket.emit('join', {roomId, name: 'Anonim'})
        return
      }
      props.setUserData({roomId, name})
      socket.emit('join', {roomId, name})
    }
  }
  return (
    <div className="join-box">
      <h2 className="join-box-title">Choose a room and name</h2>
      <form className="join-form">
        <div className="join-form-areas">
          <textarea
            onKeyDown={joinToRoomEnter}
            onChange={changeRoomIdArea}
            className="roomId-area"
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Room ID"
            value={roomId}
            maxLength="5"
          />
          <textarea
            onKeyDown={joinToRoomEnter}
            onChange={changeNameArea}
            className="nickname-area"
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Nickname"
            value={name}
            maxLength="15"
          />
        </div>
        <button onClick={joinToRoom} className="join-form-btn">JOIN</button>
      </form>
      <div className="join-box-github">
        <p className="join-box-github-title">
          <s>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</s>
          &nbsp;&nbsp;&nbsp;Me&nbsp;&nbsp;&nbsp;
          <s>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</s>
        </p>
        <a
          className="join-box-github-link"
          href="https://github.com/Abysedoto"
          target="_blank"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

export default JoinBox;
