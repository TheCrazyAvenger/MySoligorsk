import { MenuItem } from '@/components'
import { selectDarkTheme } from '@/selectors/applicationSettings'
import { setDarkTheme } from '@/slices/applicationSettings'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const Interface = () => {
  const dispatch = useDispatch()
  const darkTheme = useSelector(selectDarkTheme)

  const handleSetDarkTheme = () => {
    dispatch(setDarkTheme(!darkTheme))
  }

  const interfaceData = [
    {
      title: 'Настройки',
      color: '#0085FF',
      icon: 'settings',
      moveTo: null,
      id: 0,
    },
    {
      title: 'Мои увлечения',
      color: '#FFC700',
      icon: 'basketball',
      moveTo: null,
      id: 1,
    },
    {
      title: 'Язык',
      color: '#BD00FF',
      icon: 'language',
      moveTo: null,
      id: 2,
    },
    {
      title: 'Темная тема',
      color: '#00B2CA',
      icon: 'moon',
      moveTo: null,
      switch: true,
      switchValue: darkTheme,
      onPress: handleSetDarkTheme,
      id: 3,
    },
  ]

  return <MenuItem title={'Интерфейс'} data={interfaceData} />
}
