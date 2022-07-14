import { Typography } from '@/ui'
import React from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { PlacesToVisitContentItem } from '../PlacesToVisitContentItem'

type Props = {
  content: any
}

export const PlacesToVisitContent = ({ content }: Props) => {
  const keyExtractor = (item: any) => item.id
  const renderItem = ({ item, index }: any) => <PlacesToVisitContentItem key={index} item={item} index={index} />

  return (
    <View style={{ marginBottom: 20 }}>
      <Typography.H4 ml={20}>{content.title}</Typography.H4>
      <FlatList
        data={content.items}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{ paddingLeft: 20 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}
