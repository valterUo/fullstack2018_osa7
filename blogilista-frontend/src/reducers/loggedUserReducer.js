const initialState = null

const loggedUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_USER':
        return action.user
    case 'EMPTY_USER':
        return initialState
    default:
      return state
  }
}

export default loggedUserReducer