export const CHANGE_ISJOIN_TRUE = 'CHANGE-JOIN-TRUE';
export const CHANGE_ISJOIN_FALSE = 'CHANGE-JOIN-FALSE'

let initialState = {
  isJoined: false
}

const JoinBoxReducer = (state = initialState, action) => {
  let stateCopy = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case CHANGE_ISJOIN_TRUE:
      stateCopy.isJoined = true
      return stateCopy
    case CHANGE_ISJOIN_FALSE:
      stateCopy.isJoined = false
      return stateCopy
    default:
      return stateCopy
  }
}

export const changeIsJoinTrue = () => ({
  type: CHANGE_ISJOIN_TRUE
})
export const changeIsJoinFalse = () => ({
  type: CHANGE_ISJOIN_FALSE
})

export default JoinBoxReducer;