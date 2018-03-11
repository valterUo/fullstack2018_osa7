import React from 'react'
import { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './Blog'
import TogglableBlogs from './TogglableBlogs'

describe.only('<Blog />', () => {
    it('before clicking name and author are displayed', () => {
    const blog = {
      title: 'JokuKivaOtsikko',
      author: 'Kirjoittaja',
      url: 'www.url.com',
      likes: 42
    }

    const blogComponent = shallow(<TogglableBlogs blog = {blog}>
        <Blog blog = {blog}/>
      </TogglableBlogs>)
    
    const titleandauthorDiv = blogComponent.find('.titleAndAuthor')
    expect(titleandauthorDiv.text()).toContain(blog.title + ' by ' + blog.author)
  })

  it('after clicking name, author and the details are displayed', () => {

    const blog = {
        title: 'JokuKivaOtsikko',
        author: 'Kirjoittaja',
        url: 'www.url.com',
        likes: 42
      }
      
    const mockHandler = jest.fn() 
    const blogComponent = shallow(<TogglableBlogs blog = {blog}>
        <Blog blog = {blog}/> </TogglableBlogs>)

    const detailsDiv = blogComponent.find('.details')
    expect(detailsDiv.getElement().props.style).toEqual({ display: 'none' })
    
    const clickDiv = blogComponent.find('.titleAndAuthor')
    clickDiv.simulate('click')
    
    const detailsDiv2 = blogComponent.find('.details')
    expect(detailsDiv2.getElement().props.style).toEqual({ display: '' })
  })
})