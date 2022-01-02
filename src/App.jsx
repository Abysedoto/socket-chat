import "./App.css";
import ChatRoomContainer from "./containers/ChatRoomContainer";
import JoinBoxContainer from "./containers/JoinBoxContainer";

function App(props) {
  return (
    <div className="App">
      {!props.isJoined ? <JoinBoxContainer /> : <ChatRoomContainer />}
    </div>
  );
}

export default App;
