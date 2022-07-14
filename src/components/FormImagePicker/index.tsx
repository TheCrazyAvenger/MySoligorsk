import React from 'react'
import { View } from 'react-native'
import { ImageInputList } from '../ImageInputList'

type Props = {
  title: string
  uris: string[]
  addHandler: (...args: any) => any
  removeHandler: (...args: any) => any
}

export const FormImagePicker = ({ title, uris, addHandler, removeHandler }: Props) => {
  return (
    <View>
      <ImageInputList title={title} uris={uris} onAdd={addHandler} onRemove={removeHandler} />
    </View>
  )
}
