import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notiReducer from './reducers/notiReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
    reducer: {
        anecdoteReducer: anecdoteReducer,
        notiReducer: notiReducer,       
        filterReducer: filterReducer
    }
  })

export default store