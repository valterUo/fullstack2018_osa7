import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Users extends React.Component {
  
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const users = this.props.store.getState().users

    return (
      <div>
        <h1>Users</h1>
        <table>
        <tbody>
        <tr>
        <th>User</th>
        <th>Blogs added</th>
        </tr>
            {users.map(user => <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
            </tr>)}
        </tbody>
        </table>
      </div>  
    )
  }
}

export default Users