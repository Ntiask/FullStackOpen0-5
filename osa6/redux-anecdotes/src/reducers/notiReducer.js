import { createSlice } from '@reduxjs/toolkit'

const initialState = {'Notification': '','seconds': 5}

const noteSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
      createNotification(state, action) {
        const content = action.payload
        state.Notification = content.note
        state.seconds = content.seconds
      },

      deleteNotification(state, action) {
        const id = action.payload
        state.Notification = ''
    }
}})

  export const { createNotification, deleteNotification } = noteSlice.actions
  export default noteSlice.reducer