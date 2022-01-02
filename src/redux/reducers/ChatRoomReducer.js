const SET_ONLINE_USERS = 'SET-ONLINE-USERS';
const SET_USER_DATA = 'SET-USER-DATA';
const SET_MESSAGE_DATA = 'SET-MESSAGE-DATA';

let initialState = {
  onlineUsers: [],
  userData: [],
  messageData: []
}

const ChatRoomReducer = (state = initialState, action) => {
  let stateCopy = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case SET_ONLINE_USERS:
      stateCopy.onlineUsers = [...action.users]
      return stateCopy
    case SET_USER_DATA: 
      stateCopy.userData = action.userData
      return stateCopy
    case SET_MESSAGE_DATA: 
      stateCopy.messageData = action.messageData
      return stateCopy
    default:
      return stateCopy
  }
}

export const setOnlineUsers = (users) => ({
  type: SET_ONLINE_USERS,
  users: users
})
export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  userData: userData
})
export const setMessageData = (messageData) => ({
  type: SET_MESSAGE_DATA,
  messageData: messageData
})


export default ChatRoomReducer;