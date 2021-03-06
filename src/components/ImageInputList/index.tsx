import React from 'react'
import { View } from 'react-native'
import { ImageInput } from '../ImageInput'
import { styles } from './styles'

type Props = {
  title: string
  uris: string[]
  onAdd: (...args: any) => any
  onRemove: (...args: any) => any
}

export const ImageInputList = ({ title, uris, onAdd, onRemove }: Props) => {
  return (
    <View style={styles.imagesList}>
      {uris.map((uri, index) => (
        <View key={uri}>
          <ImageInput
            title={title}
            uris={uris}
            index={index}
            showClose={true}
            uri={uri}
            onChange={() => onRemove(uri)}
          />
        </View>
      ))}
      {uris?.length < 6 && <ImageInput onChange={(uri: string) => onAdd(uri)} />}
    </View>
  )
}
