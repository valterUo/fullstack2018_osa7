import React from 'react'
import { Alert } from 'react-bootstrap' 


const Notification = ({notification}) => {
  
  if (notification.content === null) {
    return null
  }

  if(notification.style === 'info') {
  return (
    <Alert color="success" className="alert alert-success">
      {notification.content}
      </Alert>
  )
}

if(notification.style === 'error') {
  return (
    <Alert color="warning" className="alert alert-danger">
      {notification.content}
      </Alert>
  )
}
return null
}

export default Notification