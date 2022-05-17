import { Slices } from '@/constants'

export const selectIsWaitForVerification = (state: any) => state[Slices.applicationSettings].isWaitForVerification
