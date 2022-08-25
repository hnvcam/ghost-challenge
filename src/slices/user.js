import { createSlice } from '@reduxjs/toolkit'

const { generateName } = require('../utils')

const defaultId = Math.random().toString(36).slice(2)
const initialState = {
  id: defaultId,
  name: generateName(defaultId)
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.id = action.payload
      state.name = generateName(action.payload)
    }
  }
})

export const selectUser = state => state.user

export const { setUserId } = userSlice.actions
export default userSlice.reducer
