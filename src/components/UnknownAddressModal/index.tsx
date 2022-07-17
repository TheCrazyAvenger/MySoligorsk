import { Fonts, Screens } from '@/constants'
import { selectShowSendAddressButton } from '@/selectors/applicationSettings'
import { setShowSendAddressButton } from '@/slices/applicationSettings'
import { Button, Typography } from '@/ui'
import firestore from '@react-native-firebase/firestore'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Modal, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { styles } from './styles'

type Props = {
  street: string
  house: string
  visible: boolean
  hideModal: () => any
}

export const UnknownAddressModal = ({ visible, hideModal, street, house }: Props) => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setIsLoading] = useState(false)
  const route: any = useRoute()
  const navigation = useNavigation<any>()
  const dispatch = useDispatch<any>()
  const showSendAddressButton = useSelector(selectShowSendAddressButton)
  const { colors } = useTheme()

  const handleGoNext = async () => {
    hideModal()
    navigation.navigate(Screens.acquaintanceFinish, {
      data: {
        ...route.params?.data,
        address: {
          street,
          house,
        },
      },
    })
  }

  const handleSendAddress = () => {
    setError(null)
    setIsLoading(true)
    firestore()
      .collection('Suggestions')
      .doc('Addresses')
      .update({ [`${street} ${house}`]: `${street} ${house}` })
      .then(() => {
        setIsLoading(false)
        dispatch(setShowSendAddressButton(true))
      })
      .catch((e) => {
        console.log(e)
        setError('Что-то пошло не так')
        setIsLoading(false)
      })
  }

  return (
    <Modal visible={visible} transparent statusBarTranslucent animationType='fade'>
      <View style={styles.wrappwer}>
        <View style={[styles.card, { backgroundColor: colors.background }]}>
          <Typography.H2 ph={24} style={{ textAlign: 'center', fontFamily: Fonts.openSansBold }}>
            Неизвестный адрес "{street} {house}"
          </Typography.H2>
          <Typography.Default textAlign={'center'} size={16} pv={24}>
            Вы выбрали адрес, которого нет в нашей базе. Это не значит, что его нет в городе, просто мы о нем пока не
            знаем{!showSendAddressButton ? '. Вы можете помочь, отправив его нам' : ''}
          </Typography.Default>

          <View>
            <Button buttonStyle={styles.buttons} onPress={handleGoNext}>
              Продолжить
            </Button>
            {!showSendAddressButton ? (
              <Button buttonStyle={styles.buttons} onPress={handleSendAddress}>
                Отправить адрес
              </Button>
            ) : null}
            <View>
              <Button outlined onPress={hideModal}>
                Назад
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
