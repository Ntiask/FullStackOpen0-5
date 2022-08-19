import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async newObject => {
  console.log('newobject:',newObject)
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateBlog = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteBlog = async (id) => {
  const config = {headers: { Authorization: token },}
  const response = axios.delete(`${ baseUrl }/${id}`, config)
  return response.data
}

const likeBlog = async (id, object) => {
  const response = axios.put(`${ baseUrl }/${id}`, object)
  return response.data
}

export default { getAll, createBlog, updateBlog, setToken, deleteBlog, likeBlog }