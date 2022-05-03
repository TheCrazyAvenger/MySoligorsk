import { Slices } from '@/constants'
import { createSlice } from '@reduxjs/toolkit'

type UserState = {
  firstname: string | null
  lastname: string | null
  email: string | null
}

const initialState: UserState = {
  firstname: 'Илья',
  lastname: null,
  email: null,
}

const userSlice = createSlice({
  name: Slices.user,
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = { ...state, ...action.payload }
      return state
    },
  },
})

export const {
  actions: { setUser },
  reducer: userReducer,
} = userSlice
