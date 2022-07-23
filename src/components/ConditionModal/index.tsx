import { Fonts } from '@/constants'
import { Button, Typography } from '@/ui'
import React, { useState } from 'react'
import { Modal, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { styles } from './styles'

type Props = {
  visible: boolean
  mainButtonTitle: string
  secondaryButtonTitle?: string
  mainButtonColor?: string
  secondaryButtonColor?: string
  onPressMainButton: (...args: any) => any
  onPressSecondaryButton: (...args: any) => any
  title: string
  description: string
}

export const ConditionModal = ({
  visible,
  mainButtonTitle,
  secondaryButtonTitle = 'Отмена',
  mainButtonColor,
  secondaryButtonColor,
  onPressMainButton,
  onPressSecondaryButton,
  title,
  description,
}: Props) => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setIsLoading] = useState(false)
  const { colors } = useTheme()

  const handlePress = async () => {
    try {
      setError(null)
      setIsLoading(true)
      await onPressMainButton()
      setIsLoading(false)
    } catch {
      setError('Что-то пошло не так')
    }
  }
  return (
    <Modal visible={visible} transparent statusBarTranslucent animationType='fade'>
      <View style={styles.wrappwer}>
        <View style={[styles.card, { backgroundColor: colors.background }]}>
          <Typography.H2 ph={25} style={{ textAlign: 'center', fontFamily: Fonts.openSansSemiBold }}>
            {title}
          </Typography.H2>
          <Typography.Default pv={24}>{description}</Typography.Default>

          <View>
            <Button
              loading={loading}
              buttonStyle={{ marginVertical: 24, marginBottom: 20, backgroundColor: mainButtonColor ?? colors.error }}
              onPress={handlePress}
            >
              {mainButtonTitle}
            </Button>
            <View>
              <Button
                buttonStyle={{ backgroundColor: secondaryButtonColor ?? colors.primary }}
                onPress={onPressSecondaryButton}
              >
                {secondaryButtonTitle}
              </Button>
              {error ? (
                <Typography.Description
                  style={{ position: 'absolute', bottom: -22, alignSelf: 'center' }}
                  color={colors.error}
                  textAlign={'center'}
                >
                  {error}
                </Typography.Description>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}
