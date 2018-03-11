import React from 'react'
import Blog from './components/Blog'
import User from './components/User'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Users from './components/Users'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Table, FormGroup, FormControl, ControlLabel, Button, Navbar, NavItem, Nav } from 'react-bootstrap'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '', 
      title: '',
      author: '',
      url: '',
    }
  }

  initUsers = () => {
    userService.getAll().then(users =>
      this.props.store.dispatch({
        type: 'INIT_USERS',
        users: users
      })
    )
  }

  componentWillMount() {

    this.initUsers()
    
    blogService.getAll().then(blogs =>
      this.props.store.dispatch({
        type: 'INIT_BLOGS',
        blogs: blogs
      })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.store.dispatch({
        type: 'NEW_USER',
        user: user
      })
      blogService.setToken(user.token)
    }
  }

  notify = (message, type = 'info') => {
    this.props.store.dispatch({
      type: 'NEW_NOTIFICATION',
      content: message,
      style: type
    })
    setTimeout(() => {
      console.log(this.props.store.getState())
      this.props.store.dispatch({
        type: 'EMPTY'
      })
      this.forceUpdate()
    }, 5000)
  }

  like = (id) => async () => {
    const liked = this.props.store.getState().blogs.find(b=>b._id===id)
    const updated = { ...liked, likes: liked.likes + 1 }
    await blogService.update(id, updated)
    this.notify(`you liked '${updated.title}' by ${updated.author}`)
    this.props.store.dispatch({
      type: 'LIKE',
      id: id
    })
  }

  remove = (id) => async () => {
    const deleted = this.props.store.getState().blogs.find(b => b._id === id)
    const ok = window.confirm(`remove blog '${deleted.title}' by ${deleted.author}?`)
    if ( ok===false) {
      return
    }

    await blogService.remove(id)
    this.notify(`blog '${deleted.title}' by ${deleted.author} removed`)
    this.props.store.dispatch({
      type: 'DELETE',
      id: id
    })
    this.initUsers()
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
    }
    
    const result = await blogService.create(blog)
    console.log(result)
    const theUser = {name: this.props.store.getState().loggedUser.name, _id: result.user, username: this.props.store.getState().loggedUser.username}
    const newBlog = {...result, user: theUser}
    console.log(newBlog)
    this.props.store.dispatch({
      type:'NEW_BLOG',
      blog: newBlog
    })
    this.notify(`blog '${blog.title}' by ${blog.author} added`)
    this.setState({ 
      title: '', 
      url: '', 
      author: ''
    })
    this.initUsers()
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.notify('logged out')
    this.props.store.dispatch({
      type: 'EMPTY_USER'
    })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.notify('welcome back!')
      this.setState({ username: '', password: '' })
      this.props.store.dispatch({
        type: 'NEW_USER',
        user: user
      })
    } catch (exception) {
      this.notify('käyttäjätunnus tai salasana virheellinen', 'error')
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  userByid = (id) => {
    const list = this.props.store.getState().users.filter(user => user.id === id)
    return list[0]
  }

  render() {
    if (this.props.store.getState().loggedUser === null) {
      return (
        <div className="container">
          <Notification notification={this.props.store.getState().notification} />
          {console.log(this.props.store.getState())}
          <h2>Kirjaudu sovellukseen</h2>
          <form onSubmit={this.login}>
          <FormGroup>
            <div>
            <ControlLabel>käyttäjätunnus</ControlLabel>
            <FormControl
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginChange}
              />
            </div>
            <div>
            <ControlLabel>salasana</ControlLabel>
            <FormControl
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginChange}
              />
            </div>
            <Button bsStyle="success" type="submit">Kirjaudu</Button>
            </FormGroup>
          </form>
        </div>
      )
    }

    const byLikes = (b1, b2) => b2.likes - b1.likes

    const blogsInOrder = this.props.store.getState().blogs.sort(byLikes)

    return (
      <div className="container">
        <Router>
          <div>
        <div>
          <Navbar inverse collapseOnSelect>
          <Navbar.Header>
          <Navbar.Brand>
          Blog App
          </Navbar.Brand>
          <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav>
         <NavItem href="#">
              <Link to="/">home</Link> &nbsp;
              </NavItem>
              <NavItem href="#">
              <Link to="/users">users</Link>&nbsp;
              </NavItem>
              <Nav>
              <NavItem>
              <em>{this.props.store.getState().loggedUser.name} logged in</em> <Button bsStyle="default" onClick={this.logout}>logout</Button>
              </NavItem>
              </Nav>
              </Nav>
            </Navbar.Collapse>
            </Navbar>
            </div>
            
      <Route exact path="/" render={() => <div>
        <Notification notification={this.props.store.getState().notification} />
        {console.log(this.props.store.getState())}

        <Togglable buttonLabel='uusi blogi'>
          <BlogForm 
            handleChange={this.handleLoginChange}
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
            handleSubmit={this.addBlog}
          />
        </Togglable>
        
        <h2>Blogs</h2>
        <Table striped>
        <tbody>{blogsInOrder.map(blog =>
          <tr key={blog._id}>
          <td>
          <Blog 
            key={blog._id} 
            blog={blog} 
            like={this.like(blog._id)}
            remove={this.remove(blog._id)}
            deletable={blog.user === undefined || blog.user === null || blog.user.username === this.props.store.getState().loggedUser.username}
          /></td></tr>
        )}</tbody>
        </Table>
        </div> } />
        <Route exact path="/users" render={() => 
        <div> 
          <Notification notification={this.props.store.getState().notification} />
          <Togglable buttonLabel='uusi blogi'>
          <BlogForm 
            handleChange={this.handleLoginChange}
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
            handleSubmit={this.addBlog}
          />
        </Togglable>
         <Users store = {this.props.store}/> 
         </div>} />
         <Route exact path="/users/:id" render={({match, history}) =>
        <User history={history} user={this.userByid(match.params.id)} />}
      />
        </div>
      </Router>
      </div>
    );
  }
}

export default App;