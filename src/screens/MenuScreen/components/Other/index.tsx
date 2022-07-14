import { MenuItem } from '@/components'
import React from 'react'
import { accountData } from './data'

export const Other = () => {
  return <MenuItem title={'Обратная связь'} data={accountData} />
}
