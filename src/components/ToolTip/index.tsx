import React from 'react'
import { Text } from 'react-native'
import { useTheme } from 'react-native-paper'
import Tooltip from 'rn-tooltip'
import { styles } from './styles'

type CustomTooltipProps = {
  message: string
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ message, children }) => {
  const { colors }: any = useTheme()

  return (
    <Tooltip
      actionType='press'
      containerStyle={styles.containerStyle}
      withOverlay={false}
      width='70%'
      height={'auto'}
      backgroundColor={colors.navigation}
      popover={<Text style={[styles.tooltipMessageText, { color: colors.text }]}>{message}</Text>}
    >
      {children}
    </Tooltip>
  )
}
