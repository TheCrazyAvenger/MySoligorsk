import { MenuItem } from '@/components'
import { Screens } from '@/constants'
import React from 'react'

export const Other = () => {
  const accountData = [
    {
      title: 'Нашли ошибку?',
      color: '#55C9D0',
      icon: 'alert',
      screen: Screens.sendError,
      id: 0,
    },
    {
      title: 'Помощь',
      color: '#9B9B9B',
      icon: 'help',

      id: 1,
    },
  ]

  return <MenuItem title={'Обратная связь'} data={accountData} />
}
