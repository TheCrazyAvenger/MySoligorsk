import { Slices } from '@/constants'

export const selectIsWaitForVerification = (state: any) => state[Slices.applicationSettings].isWaitForVerification
export const selectOtherInterestSelected = (state: any) => state[Slices.applicationSettings].otherInterestSelected
export const selectShowSendAddressButton = (state: any) => state[Slices.applicationSettings].showSendAddressButton
