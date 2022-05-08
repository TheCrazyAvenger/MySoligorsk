export const getWeatherBackground = (weather: string) => {
  const bg: any = {
    Clear: '#03e3fc',
    Clouds: '#04c1d6',

    Drizzle: '#0c9bab',
    Rain: '#9aabad',
    Thunderstorm: '#757e80',
    Snow: '#d7f3f7',
    Mist: '#dce2e3',
    Smoke: '#dce2e3',
    Haze: '#dce2e3',
    Dust: '#dce2e3',
    Fog: '#dce2e3',
    Sand: '#dce2e3',
    Ash: '#dce2e3',
    Squall: '#dce2e3',
    Tornado: '#dce2e3',
  }

  return bg[weather] ?? '#03e3fc'
}
