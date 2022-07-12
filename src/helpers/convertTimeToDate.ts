export const convertTimeToDate = (time: string) => {
  const splitedTime = time.split(':')
  const hours = splitedTime[0]
  const minutes = splitedTime[1]

  const newDate = new Date().toLocaleString()
  return newDate
}
