import React from 'react'

class TogglableBlogs extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        visible: false
      }
    }
  
    toggleVisibility = () => {
      this.setState({visible: !this.state.visible})
    }
  
    render() {
      const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
      const showWhenVisible = { display: this.state.visible ? '' : 'none' }

      if(this.props.blog.user) {
        return(
          <div>
          <div style={hideWhenVisible}>
            <div onClick={() => this.setState({visible: !this.state.visible})} className="titleAndAuthor">{this.props.blog.title} by {this.props.blog.author}</div>
          </div>
          <div style={showWhenVisible} className="details">
          <div onClick={this.toggleVisibility}>{this.props.blog.title} by {this.props.blog.author}</div>
          {this.props.children}
          </div>
          </div>
        )
      } else {
          return(
            <div>
          <div style={hideWhenVisible}>
            <div onClick={() => this.setState({visible: !this.state.visible})} className="titleAndAuthor">{this.props.blog.title} by {this.props.blog.author}</div>
          </div>
          <div style={showWhenVisible} className="details">
          <div onClick={this.toggleVisibility}>{this.props.blog.title} by {this.props.blog.author}</div>
            {this.props.children}
          </div>
          </div>
          )}
    }
  }

export default TogglableBlogs