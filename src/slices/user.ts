import { Slices } from '@/constants'
import { createSlice } from '@reduxjs/toolkit'

type UserState = {
  firstname: string | null
  lastname: string | null
  email: string | null
  interests: string[] | null
}

const initialState: UserState = {
  firstname: null,
  lastname: null,
  email: null,
  interests: null,
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
