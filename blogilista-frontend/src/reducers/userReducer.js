const initialState = []

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_USERS':
        return action.users
    default:
      return state
  }
}

export default userReducer