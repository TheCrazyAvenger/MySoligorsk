import React from 'react'
import { View } from 'react-native'
import { ImageInput } from '../ImageInput'
import { styles } from './styles'

type Props = {
  uris: string[]
  onAdd: (...args: any) => any
  onRemove: (...args: any) => any
}

export const ImageInputList = ({ uris, onAdd, onRemove }: Props) => {
  return (
    <View style={styles.imagesList}>
      {uris.map((uri) => (
        <View key={uri}>
          <ImageInput showClose={true} uri={uri} onChange={() => onRemove(uri)} />
        </View>
      ))}
      {uris?.length < 6 && <ImageInput onChange={(uri: string) => onAdd(uri)} />}
    </View>
  )
}
