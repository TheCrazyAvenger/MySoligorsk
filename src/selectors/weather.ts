import { Slices } from '@/constants'

export const selectWeather = (state: any) => state[Slices.weather].weather
