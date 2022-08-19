
//import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notiReducer'


const AnecdoteList = (props) => {
    //const dispatch = useDispatch()
    const filter = props.filter
    const anecdotes = props.anecdotes
    const filteredanecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter))

    const votehandler = (anecID) => {
      props.vote(anecID)
      props.createNotification({
          'note': `You Voted! anecdote ID: ${anecID} (this notification is here 5 seconds)`,
          'seconds': 2 })
      setTimeout(() => {
        props.createNotification({
          'note': ``,
          'seconds': 2})
      }, 2000);
    }

    return <div>
     {filteredanecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={()=>votehandler(anecdote.id)}>vote</button>
          </div>
        </div>
      )} </div>
}

const mapStateToProps = (state) => {
  console.log('filter', state.filterReducer.filter)
  console.log('anecdotes', state.anecdoteReducer)
  return {
    filter: state.filterReducer.filter,
    anecdotes: state.anecdoteReducer,
  }
}

export default connect(
  mapStateToProps,
  { createNotification, deleteNotification, vote, }
)(AnecdoteList)
