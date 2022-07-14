import { Slices } from '@/constants'

export const selectIsLoggedIn = (state: any) => state[Slices.authentication].isLoggedIn
export const selectDevice = (state: any) => state[Slices.authentication].deviceId
export const selectRegisterType = (state: any) => state[Slices.authentication].loginInfo.register_type
export const selectToken = (state: any) => state[Slices.authentication].loginInfo.token
export const selectIsRegistered = (state: any) => state[Slices.authentication].isRegistered
