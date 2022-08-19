import { createSlice } from '@reduxjs/toolkit'

const initialState = {filter: ''}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
      setFilter(state, action) {
        const content = action.payload
        state.filter = content
        console.log(state.filter)
}}})

  export const { setFilter } = filterSlice.actions
  export default filterSlice.reducer