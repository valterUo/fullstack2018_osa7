import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import loggedUserReducer from './reducers/loggedUserReducer'

const reducer = combineReducers({
    notification: notificationReducer,
    users: userReducer,
    blogs: blogReducer,
    loggedUser: loggedUserReducer
  })

const store = createStore(reducer, composeWithDevTools())

export default store