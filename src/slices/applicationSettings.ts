import { Slices } from '@/constants'
import { createSlice } from '@reduxjs/toolkit'

type ApplicationSettingsStateType = {
  isWaitForVerification: boolean
  otherInterestSelected: boolean
  showSendAddressButton: boolean
  darkTheme: boolean
}

const initialState: ApplicationSettingsStateType = {
  isWaitForVerification: false,
  otherInterestSelected: false,
  showSendAddressButton: false,
  darkTheme: false,
}

const applicationSettingsSlice = createSlice({
  name: Slices.authentication,
  initialState,
  reducers: {
    setIsWaitForVerification: (state, action) => {
      return { ...state, isWaitForVerification: action.payload }
    },
    setOtherInterestSelected: (state, action) => {
      return { ...state, otherInterestSelected: action.payload }
    },
    setShowSendAddressButton: (state, action) => {
      return { ...state, showSendAddressButton: action.payload }
    },
    setDarkTheme: (state, action) => {
      return { ...state, darkTheme: action.payload }
    },
  },
})

export const {
  actions: { setIsWaitForVerification, setOtherInterestSelected, setShowSendAddressButton, setDarkTheme },
  reducer: applicationSettingsReducer,
} = applicationSettingsSlice
