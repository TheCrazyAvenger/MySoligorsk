import { Slices } from '@/constants'
import { createSlice } from '@reduxjs/toolkit'

type ApplicationSettingsStateType = {
  isWaitForVerification: boolean
}

const initialState: ApplicationSettingsStateType = {
  isWaitForVerification: false,
}

const applicationSettingsSlice = createSlice({
  name: Slices.authentication,
  initialState,
  reducers: {
    setIsWaitForVerification: (state, action) => {
      return { ...state, isWaitForVerification: action.payload }
    },
  },
})

export const {
  actions: { setIsWaitForVerification },
  reducer: applicationSettingsReducer,
} = applicationSettingsSlice
