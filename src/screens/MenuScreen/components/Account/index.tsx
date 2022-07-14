import { MenuItem } from '@/components'
import { setUser } from '@/slices'
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'
import React from 'react'
import { useDispatch } from 'react-redux'

export const Account = () => {
  const dispatch = useDispatch()
  const handleLogout = async () => {
    await AsyncStorage.removeItem('isSignIn')
    await dispatch(setUser({ firstname: null, lastname: null, email: null }))
    auth().signOut()
  }

  const accountData = [
    {
      title: 'Личная информация',
      color: '#FF7A00',
      icon: 'person',
      moveTo: null,
      id: 0,
    },
    {
      title: 'Изменить аккаунт',
      color: '#35AC41',
      icon: 'key',
      moveTo: null,
      id: 1,
    },
    {
      title: 'Удаление аккаунта',
      color: '#00B2CA',
      icon: 'trash',
      moveTo: null,
      id: 2,
    },
    {
      title: 'Выйти из аккаунта',
      color: '#FF0000',
      icon: 'log-out',
      onPress: handleLogout,
      moveTo: null,
      id: 3,
    },
  ]

  return <MenuItem title={'Управление аккаунтом'} data={accountData} />
}
