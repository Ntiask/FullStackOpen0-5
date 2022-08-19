import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
      appendBlog(state,action){
        console.log(action.payload)
        state.push(action.payload)
      },
      getBlogs(state,action) {
        return state
    },
      setBlogs(state,action) {
        return action.payload
          
    },
    delBlog(state,action){
        const id = action.payload
        state.filter(blog => blog.id !== id)
    },
}
})

export const { getBlogs, setBlogs, appendBlog, delBlog } = blogSlice.actions

export const initializeNotes = () => {
    return async dispatch => {
      const notes = await blogService.getAll()
      dispatch(setBlogs(notes))
    }
  }

  export const createBlog = content => {
    return async dispatch => {
      const newBlog = await blogService.createBlog(content)
      console.log('newBLOG', newBlog)
      dispatch(appendBlog(newBlog))
    }
  }

  export const deleteBlog = id => {
    return async dispatch => {
      const res = await blogService.deleteBlog(id)
      dispatch(delBlog(id))
    }
  }

  export const likeBlog = (id, object) => {
    return async dispatch => {
      const res = await blogService.likeBlog(id, object)
    }
  }
export default blogSlice.reducer