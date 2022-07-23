import { Typography } from '@/ui'
import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { ImageInputList } from '../ImageInputList'

type Props = {
  title: string
  label?: string
  uris: string[]
  addHandler: (...args: any) => any
  removeHandler: (...args: any) => any
  style?: StyleProp<ViewStyle>
}

export const FormImagePicker = ({ style, label, title, uris, addHandler, removeHandler }: Props) => {
  return (
    <View>
      {label ? <Typography.Default type='semiBold'>{label}</Typography.Default> : null}
      <ImageInputList style={style} title={title} uris={uris} onAdd={addHandler} onRemove={removeHandler} />
    </View>
  )
}
