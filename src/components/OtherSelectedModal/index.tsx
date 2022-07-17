import { Fonts } from '@/constants'
import { Button, Input, Typography } from '@/ui'
import firestore from '@react-native-firebase/firestore'
import React, { useState } from 'react'
import { Modal, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { styles } from './styles'

type Props = {
  visible: boolean
  hideModal: () => any
}

export const OtherSelectedModal = ({ visible, hideModal }: Props) => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setIsLoading] = useState(false)
  const { colors } = useTheme()

  const [interstValue, setInterestValue] = useState('')

  const handleSendInterset = () => {
    setError(null)
    setIsLoading(true)
    firestore()
      .collection('Suggestions')
      .doc('Interests')
      .update({ [interstValue]: interstValue })
      .then(() => {
        setIsLoading(false)
        hideModal()
      })
      .catch(() => {
        setError('Что-то пошло не так')
        setIsLoading(false)
      })
  }

  const isSendDisabled = loading || interstValue.length < 3

  return (
    <Modal visible={visible} transparent statusBarTranslucent animationType='fade'>
      <View style={styles.wrappwer}>
        <View style={[styles.card, { backgroundColor: colors.background }]}>
          <Typography.H2 ph={24} style={{ textAlign: 'center', fontFamily: Fonts.openSansBold }}>
            Вы выбрали "Другое"
          </Typography.H2>
          <Typography.Default textAlign={'center'} size={16} pv={24}>
            Поделитесь с нами вашим интересом и, возможно, в будущем он появится в списке
          </Typography.Default>

          <Input.Default
            placeholder={'Введите интерес'}
            inputContainerStyle={{ width: '100%' }}
            value={interstValue}
            onChangeText={setInterestValue}
          />

          <View>
            <Button
              loading={loading}
              disabled={isSendDisabled}
              buttonStyle={styles.buttons}
              onPress={handleSendInterset}
            >
              Отправить
            </Button>
            <View>
              <Button outlined onPress={hideModal}>
                Отмена
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
