import { createSlice } from '@reduxjs/toolkit'
import anecService from '../services/anecService'


const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: null,
    votes: 0
  }
}

const filterSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
      addfromdb(state,action) {
        action.payload.forEach(element => {
          state.push(element)
        });
      },      
      newAnecdote(state, action) {
        const newObject = asObject(action.payload)
        state.concat(newObject)
      },
      vote(state, action) {
        const id = action.payload
        const results = state.find(n => n.id === id)
        anecService.votetoDB(id).then(res => console.log(res))
        state.map(anc => anc.id !== results.id ? anc : results)
      },
      getPayload(state,action) {
        return action.payload
      }
    }
  }
)

  export const { vote, newAnecdote, addfromdb, getPayload} = filterSlice.actions

  export const initializeNotes = () => {
    return async dispatch => {
      const response = await anecService.getAll()
      dispatch(addfromdb(response))
    }
  }

  export default filterSlice.reducer