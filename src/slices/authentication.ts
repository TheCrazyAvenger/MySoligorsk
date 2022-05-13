import { Slices } from '@/constants'
import { createSlice } from '@reduxjs/toolkit'

type AuthenticationStateType = {
  isLoggedIn: boolean
  deviceId: string | null
  loginInfo: {
    id: string | null
    device: string | null
    token: string | null
    email: string | null
    password: string | null
    register_type: string | null
  } | null
}

const initialState: AuthenticationStateType = {
  isLoggedIn: false,
  deviceId: null,
  loginInfo: null,
}

const authenticationSlice = createSlice({
  name: Slices.authentication,
  initialState,
  reducers: {
    setLogin: (state, action) => {
      return { ...state, deviceId: action.payload.device, loginInfo: { ...action.payload }, isLoggedIn: true }
    },
    removeLogin: (state) => {
      return { ...state, loginInfo: null, isLoggedIn: false }
    },
  },
})

export const {
  actions: { setLogin, removeLogin },
  reducer: authenticationReducer,
} = authenticationSlice
