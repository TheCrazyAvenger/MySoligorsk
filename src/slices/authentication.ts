import { Slices } from '@/constants'
import { createSlice } from '@reduxjs/toolkit'

type AuthenticationStateType = {
  isAnonymous: boolean
  isLoggedIn: boolean
  loginInfo: {
    token: string | null
    email: string | null
    register_type: string | null
  } | null
}

const initialState: AuthenticationStateType = {
  isAnonymous: false,
  isLoggedIn: false,
  loginInfo: null,
}

const authenticationSlice = createSlice({
  name: Slices.authentication,
  initialState,
  reducers: {
    setLogin: (state, action) => {
      return { ...state, isAnonymous: action.payload.isAnonymous, loginInfo: { ...action.payload }, isLoggedIn: true }
    },
    removeLogin: (state) => {
      return { ...state, isAnonymous: false, loginInfo: null, isLoggedIn: false }
    },
  },
})

export const {
  actions: { setLogin, removeLogin },
  reducer: authenticationReducer,
} = authenticationSlice
