import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

const createNew = async(newobject) => {
  const response = await axios.post(baseUrl, newobject)
    return response.data
}

const getbyID = async (id) => {
    const response = await axios.get(baseUrl+'/'+id)
    return response.data
}

const votetoDB = async (id) => {
  const object = await getbyID(id)
  object.votes = object.votes + 1
  const response = await axios.put(baseUrl+'/'+id,object)
  return response.data
}
  
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, votetoDB }