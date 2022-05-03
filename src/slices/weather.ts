import { Slices } from '@/constants'
import { createSlice } from '@reduxjs/toolkit'

type WeatherState = {
  weather: any[]
}

const initialState: WeatherState = {
  weather: [],
}

const weatherSlice = createSlice({
  name: Slices.weather,
  initialState,
  reducers: {
    setWeather: (state, action) => {
      state.weather = action.payload
      return state
    },
  },
})

export const {
  actions: { setWeather },
  reducer: weatherReducer,
} = weatherSlice
