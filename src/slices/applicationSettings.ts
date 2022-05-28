import { Slices } from '@/constants'
import { createSlice } from '@reduxjs/toolkit'

type ApplicationSettingsStateType = {
  isWaitForVerification: boolean
  otherInterestSelected: boolean
  showSendAddressButton: boolean
}

const initialState: ApplicationSettingsStateType = {
  isWaitForVerification: false,
  otherInterestSelected: false,
  showSendAddressButton: false,
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
  },
})

export const {
  actions: { setIsWaitForVerification, setOtherInterestSelected, setShowSendAddressButton },
  reducer: applicationSettingsReducer,
} = applicationSettingsSlice
