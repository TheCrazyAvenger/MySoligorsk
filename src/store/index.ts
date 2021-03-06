import { weatherApi } from '@/api'
import { Slices } from '@/constants'
import { userReducer, weatherReducer } from '@/slices'
import { applicationSettingsReducer } from '@/slices/applicationSettings'
import { authenticationReducer } from '@/slices/authentication'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const reducers = combineReducers({
  [weatherApi.reducerPath]: weatherApi.reducer,
  [Slices.applicationSettings]: applicationSettingsReducer,
  [Slices.authentication]: authenticationReducer,
  [Slices.user]: userReducer,
  [Slices.weather]: weatherReducer,
})

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(weatherApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
