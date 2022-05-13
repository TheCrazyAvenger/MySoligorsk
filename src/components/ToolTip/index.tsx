import { Colors } from '@/constants'
import React from 'react'
import { Text } from 'react-native'
import Tooltip from 'rn-tooltip'
import { styles } from './styles'

type CustomTooltipProps = {
  message: string
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ message, children }) => {
  return (
    <Tooltip
      actionType='press'
      containerStyle={styles.containerStyle}
      withOverlay={false}
      width='70%'
      height={'auto'}
      backgroundColor={Colors.white}
      popover={<Text style={styles.tooltipMessageText}>{message}</Text>}
    >
      {children}
    </Tooltip>
  )
}
