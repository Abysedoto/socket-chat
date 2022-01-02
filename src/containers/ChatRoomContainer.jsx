import { connect } from "react-redux";
import ChatRoom from "../components/ChatRoom";
import {
  setOnlineUsers,
  setMessageData,
} from "../redux/reducers/ChatRoomReducer";
import { changeIsJoinFalse } from "../redux/reducers/JoinBoxReducer";

const mapStateToProps = (state) => {
  return {
    onlineUsers: state.chatRoom.onlineUsers,
    userData: state.chatRoom.userData,
    isJoined: state.joinBox.isJoined,
    messageData: state.chatRoom.messageData
  };
};

export default connect(mapStateToProps, {
  setOnlineUsers,
  changeIsJoinFalse,
  setMessageData,
})(ChatRoom);
