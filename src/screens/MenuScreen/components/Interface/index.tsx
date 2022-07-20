import { MenuItem } from '@/components'
import { Screens } from '@/constants'
import { selectDarkTheme } from '@/selectors/applicationSettings'
import { setDarkTheme } from '@/slices/applicationSettings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const Interface = () => {
  const dispatch = useDispatch()
  const darkTheme = useSelector(selectDarkTheme)

  const handleSetDarkTheme = async () => {
    await AsyncStorage.setItem('darkTheme', (!darkTheme).toString())
    dispatch(setDarkTheme(!darkTheme))
  }

  const interfaceData = [
    {
      title: 'Мои увлечения',
      color: '#FFC700',
      icon: 'basketball',
      screen: Screens.myInterests,
      id: 0,
    },
    {
      title: 'Язык',
      color: '#BD00FF',
      icon: 'language',
      screen: null,
      id: 1,
    },
    {
      title: 'Темная тема',
      color: '#00B2CA',
      icon: 'moon',
      switch: true,
      switchValue: darkTheme,
      onPress: handleSetDarkTheme,
      id: 2,
    },
  ]

  return <MenuItem title={'Интерфейс'} data={interfaceData} />
}
