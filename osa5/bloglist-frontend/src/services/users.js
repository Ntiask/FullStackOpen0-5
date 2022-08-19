import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async credentials => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getbyID = async (id) => {
  const res = await axios.get(baseUrl+'/'+id)
  return res.data
}

export default { getAll, getbyID }