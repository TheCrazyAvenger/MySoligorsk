import { BASE_WEATHER_API_KEY, BASE_WEATHER_URL } from '@/constants'
import { setWeather } from '@/slices'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_WEATHER_URL}${BASE_WEATHER_API_KEY}`,
  }),
  endpoints: (build) => ({
    getWeather: build.query<any, any>({
      keepUnusedDataFor: 0,
      query: () => ({
        url: '',
        method: 'GET',
      }),
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          dispatch(setWeather(data))
        } catch (err) {}
      },
    }),
  }),
})

export const { useGetWeatherQuery } = weatherApi
