import { Colors } from '@/constants'
import { BottomSheet as RNBottomSheet, ListItem } from '@rneui/themed'
import React from 'react'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { Typography } from '../Typography'
import { styles } from './styles'

type Props = {
  data: { title: string; icon?: string; onPress: (...args: any) => any }[]
  isVisible: boolean
  onClose: (condition: boolean) => any
}

export const BottomSheet = ({ data, isVisible, onClose }: Props) => {
  const handleClose = () => {
    onClose(false)
  }

  return (
    <RNBottomSheet
      onBackdropPress={handleClose}
      isVisible={isVisible}
      modalProps={{ animationType: 'fade', statusBarTranslucent: true }}
    >
      {data.map((item, i) => (
        <TouchableRipple key={i} borderless onPress={item.onPress}>
          <ListItem>
            <ListItem.Content style={styles.container}>
              {item.icon ? (
                <Icon name={item.icon} color={Colors.iconGrey} size={23} style={{ marginRight: 15 }} />
              ) : null}
              <Typography.Default type='semiBold'>{item.title}</Typography.Default>
            </ListItem.Content>
          </ListItem>
        </TouchableRipple>
      ))}
    </RNBottomSheet>
  )
}
