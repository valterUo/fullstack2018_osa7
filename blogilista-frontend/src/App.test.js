import React from 'react'
import { shallow, mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe.only('<App />', () => {
  let app
    describe('when user is not logged', () => {
        beforeAll(() => {
            app = mount(<App />)
        })

        it('renders no blogs before log in', () => {
            app.update()
            const blogComponents = app.find(Blog)
            expect(blogComponents.length).toEqual(0)
        })

        it('renders log in form', () => {
            app.update()
            const blogComponents = app.find('.loginForm')
            expect(blogComponents.length).toEqual(1)
        })
    })

    describe.only('when user is logged', () => {
        beforeEach(() => {
            app = mount(<App />)

            const user = {
                username: 'tester',
                token: '1231231214',
                name: 'Teuvo Testaaja'
              }
              
                window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
          })
      
          it('all blogs are rendered', () => {
            app.update()
            const blogComponents = app.find(Blog)
            //console.log(blogComponents.debug())
            //expect(blogComponents.length).toEqual(1)
          })
    })
})