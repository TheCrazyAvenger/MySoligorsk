import { Colors } from '@/constants'
import { BottomSheet as RNBottomSheet, ListItem } from '@rneui/themed'
import React from 'react'
import { View } from 'react-native'
import { Snackbar, TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { Typography } from '../Typography'
import { styles } from './styles'

type Props = {
  data: { title: string; icon?: string; description?: string; onPress?: (...args: any) => any; isSelected?: boolean }[]
  isVisible: boolean
  onClose: (condition: boolean) => any
  center?: boolean
  error?: string | null
  hideError?: any
  selectedColor?: string
}

export const BottomSheet = ({ data, isVisible, onClose, center = false, error, hideError, selectedColor }: Props) => {
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
          <ListItem containerStyle={{ backgroundColor: item.isSelected ? selectedColor ?? '#A4CFF7' : Colors.white }}>
            <ListItem.Content style={styles.container}>
              {item.icon ? (
                <Icon
                  name={item.icon}
                  color={item.isSelected ? Colors.white : Colors.iconGrey}
                  size={23}
                  style={{ marginRight: 15 }}
                />
              ) : null}
              <View
                style={[
                  styles.info,
                  { justifyContent: center ? 'center' : item.description ? 'space-between' : 'flex-start' },
                ]}
              >
                <Typography.Default color={item.isSelected ? Colors.white : Colors.black} type='semiBold'>
                  {item.title}
                </Typography.Default>
                {item.description ? (
                  <Typography.Default color={item.isSelected ? Colors.white : Colors.black} type='semiBold'>
                    {item.description}
                  </Typography.Default>
                ) : null}
              </View>
            </ListItem.Content>
          </ListItem>
        </TouchableRipple>
      ))}
      <Snackbar
        visible={!!error}
        onDismiss={hideError}
        style={{ zIndex: 100000 }}
        action={{
          label: 'Окей',
        }}
      >
        {error}
      </Snackbar>
    </RNBottomSheet>
  )
}
