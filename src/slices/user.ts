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
    setInterest: (state, action) => {
      console.log(action.payload)
      state = { ...state, interests: action.payload }
    },
  },
})

export const {
  actions: { setUser, setInterest },
  reducer: userReducer,
} = userSlice
