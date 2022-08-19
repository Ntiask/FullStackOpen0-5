import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blogtoast from './Blogtoast'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'asdasdasd',
    likes: 3
  }

  render(<Blogtoast blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library asdasdasd')
  expect(element).toBeDefined()
})

test('renders likes', async () =>{
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'asdasdasd',
        likes: 3
      }
      
      render(<Blogtoast blog={blog} />)
      const user = userEvent.setup()
      const button = screen.getByText('View')
      await user.click(button)
      const element = screen.getByText('Likes: 3')
      expect(element).toBeDefined()
})

test('View Button Mocs', async () =>{
    
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'asdasdasd',
        likes: 3
      }
      const mockHandler = jest.fn()
      render(<button onClick={mockHandler}>View</button>)

      const user = userEvent.setup()

      const button = screen.getByText('View')
      await user.click(button)
      await user.click(button)
      expect(mockHandler.mock.calls).toHaveLength(2)
})

test('blog form test', async () =>{
    // NOTE: THIS DOES NOT WORK AS I HAVE HIGHER LEVEL COMPONENT THAN ONLY SINGULAR BLOG BUT THIS BELOW CODE WOULD WORK IF I WOULD HAVE ONE.
    const user = userEvent.setup()
    const createNote = jest.fn()

    const setErrorMessaga = (error) => {
        console.log(error)
    }
    render(<CreateBlogForm createNote={createNote} setErrorMessage={setErrorMessaga}  />)

    const inputs = screen.getByPlaceholderText('Enter Title')
    const inputs2 = screen.getByPlaceholderText('www.example.com')
    const inputs3 = screen.getByPlaceholderText('Alison Kent')
    userEvent.type(inputs, 'testing a form...' )
    userEvent.type(inputs2, 'testing a form...' )
    userEvent.type(inputs3, 'testing a form...' )
    
    const sendButton = screen.getByText('Submit')

    await user.click(sendButton)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})