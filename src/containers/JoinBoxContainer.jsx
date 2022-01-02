import {changeIsJoinTrue} from '../redux/reducers/JoinBoxReducer';
import {setUserData} from '../redux/reducers/ChatRoomReducer'
import { connect } from "react-redux";
import JoinBox from "../components/JoinBox";

const mapStateToProps = (state) => {
  return {
    isJoined: state.joinBox.isJoined,
    userData: state.chatRoom.userData
  }
}

export default connect(mapStateToProps, {changeIsJoinTrue, setUserData})(JoinBox)