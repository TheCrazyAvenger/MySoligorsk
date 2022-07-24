import { Slices } from '@/constants'
import { createSlice } from '@reduxjs/toolkit'

type UserState = {
  firstname: string | null
  lastname: string | null
  email: string | null
  interests: string[] | null
  hiddenInterests: string[] | null
  avatar: string | null
}

const initialState: UserState = {
  firstname: null,
  lastname: null,
  email: null,
  interests: null,
  hiddenInterests: null,
  avatar: null,
}

const userSlice = createSlice({
  name: Slices.user,
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = { ...state, ...action.payload }
      return state
    },
    setInterest: (state, action) => {
      state = { ...state, interests: action.payload }
    },
    setHiddenInterest: (state, action) => {
      state = { ...state, hiddenInterests: action.payload }
    },
  },
})

export const {
  actions: { setUser, setInterest, setHiddenInterest },
  reducer: userReducer,
} = userSlice
