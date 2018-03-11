import React from 'react'
import userService from '../services/users'

const User = ({user, history}) => {

    /*if(user === undefined) {
        const pathname = history.location.pathname
        const splittedPath = pathname.split('/')
        const id = splittedPath[2]
        const users2 = GetUsers()
        const theUser = users2.filter(user => user.id === id)
        console.log(theUser)
        return (
            <div>
            <h1>{user.name}</h1>
            <p>Added blogs</p>
            <ul>{user.blogs.map(blog =>
            <li key = {blog._id}>{blog.title} by {blog.author}</li>
            )}</ul>
        </div>
        )
    }*/

    return (
        <div>
        <h1>{user.name}</h1>
        <p>Added blogs</p>
        <ul>{user.blogs.map(blog =>
        <li key = {blog._id}>{blog.title} by {blog.author}</li>
        )}</ul>
    </div>
    )
}

export default User
