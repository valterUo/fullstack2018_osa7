import React from 'react'
import PropTypes from 'prop-types'
import { Table, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const BlogForm = ({ title, author, url, handleChange, handleSubmit }) => {
  return (
    <div>
      <h2>Luo uusi blogi</h2>

      <form onSubmit={handleSubmit}>
      <FormGroup>
        <div>
        <ControlLabel>title</ControlLabel>
        <FormControl
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
        <ControlLabel>author</ControlLabel>
        <FormControl
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
          />
        </div>
        <div>
        <ControlLabel>url</ControlLabel>
        <FormControl
            type="text"
            name="url"
            value={url}
            onChange={handleChange}
          />
        </div>        

        <Button bsStyle="success" type="submit">Luo</Button>
        </FormGroup>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  author: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}


export default BlogForm