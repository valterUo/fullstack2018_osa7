import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders title and likes', () => {
    const blog = {
      title: 'JokuKivaOtsikko',
      author: 'Kirjoittaja',
      likes: 42
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleandauthorDiv = blogComponent.find('.titleAndAuthor')
    const likesDiv = blogComponent.find('.likes') 
    expect(titleandauthorDiv.text()).toContain(blog.title + ' by ' + blog.author)
    expect(likesDiv.text()).toContain('blog has 42 likes')
  })

  it('clicking the button calls event handler twice', () => {
    const blog = {
        title: 'JokuKivaOtsikko',
        author: 'Kirjoittaja',
        likes: 42
      }
  
    const mockHandler = jest.fn()
  
    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )
  
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})