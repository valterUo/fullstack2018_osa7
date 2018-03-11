const initialState = {content: null, style: null}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return {content: action.content, style: action.style}
    case 'EMPTY':
      return initialState
    default:
      return state
  }
}

  export default notificationReducer