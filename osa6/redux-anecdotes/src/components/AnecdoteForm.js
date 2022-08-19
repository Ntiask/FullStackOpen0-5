import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notiReducer'
import anecService from '../services/anecService'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const asDBObject = (content) => {
      return {
      "content": content,
      "id": null,
      "votes": 0
      }
    }

    const newAnec = async (event) => {
        event.preventDefault()
        const content = event.target.anecdoteContent.value
        event.target.anecdoteContent.value = ''
        dispatch(newAnecdote(content))
        const response = await anecService.createNew(asDBObject(content))
        dispatch(createNotification(`${response.status} New Anecdote Created`))
        setTimeout(function(){
          dispatch(deleteNotification(''))
      }, 5000);
      }
      
      //setTimeout(dispatch(deleteNotification('')), 5000)

    return (
        <div><h2>create new</h2>
        <form onSubmit={newAnec}>
        <div><input name="anecdoteContent" /></div>
        <button type='Submit'>create</button>
        </form>
        </div>
        )
}

export default AnecdoteForm