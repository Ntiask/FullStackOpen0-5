import { createSlice } from '@reduxjs/toolkit'

const initialState = {error: ''}

const noteSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
      setError(state, action) {
        const content = action.payload
        state.error = action.payload
    }
}
})

export const { setError } = noteSlice.actions
export default noteSlice.reducer