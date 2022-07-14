import { Colors } from '@/constants'

const getMinDiff = (startDate: any, endDate: any) => {
  const msInMinute = 60 * 1000

  return Math.round(Math.abs(endDate - startDate) / msInMinute)
}

export const getWorkingHoursMessage = (workingHours: any) => {
  const currentDate = new Date()

  const currentDay = new Date().getDay()
  const currentWorkingHours = workingHours[currentDay]
  const { open: startTime, close: endTime } = currentWorkingHours

  const nextDay = new Date(new Date().setDate(new Date().getDate() + 1)).getDay()
  const nextWorkingHours = workingHours[nextDay]
  const { open: nextStartTime } = nextWorkingHours

  const splitedStartTime = startTime.split(':')
  const startHours = +splitedStartTime[0]
  const startMinutes = +splitedStartTime[1]

  const splitedEndTime = endTime.split(':')
  const endHours = +splitedEndTime[0]
  const endMinutes = +splitedEndTime[1]

  const splitedNextStartTime = nextStartTime.split(':')
  const nextStartHours = +splitedNextStartTime[0]
  const nextStartMinutes = +splitedNextStartTime[1]

  const startDate = new Date(new Date(new Date().setHours(startHours)).setMinutes(startMinutes))
  const endDate = new Date(new Date(new Date().setHours(endHours)).setMinutes(endMinutes))
  const nextStartDate = new Date(new Date(new Date().setHours(nextStartHours)).setMinutes(nextStartMinutes))

  const finalNextStartDate = new Date(nextStartDate.setDate(nextStartDate.getDate() + 1))
  const finalEndDate = startDate < endDate ? endDate : new Date(endDate.setDate(endDate.getDate() + 1))

  if (currentDate >= startDate && currentDate <= finalEndDate) {
    const minutesBeforeClose = getMinDiff(currentDate, finalEndDate)
    if (minutesBeforeClose < 60) {
      return { title: `Закроется через ${minutesBeforeClose} мин.`, color: Colors.error }
    }
    return { title: `Открыто до ${endTime}`, color: Colors.grass }
  }
  if (currentDate <= startDate) {
    const minutesBeforeOpen = getMinDiff(currentDate, startDate)
    if (minutesBeforeOpen < 60) {
      return { title: `Откроется через ${minutesBeforeOpen} мин.`, color: Colors.error }
    }
    return { title: `Закрыто до ${startTime}`, color: Colors.error }
  }
  if (currentDate >= finalEndDate && currentDate <= finalNextStartDate) {
    return { title: `Закрыто до ${nextStartTime}`, color: Colors.error }
  } else return { title: `Закрыто`, color: Colors.error }
}
