import { Colors, Fonts } from '@/constants'
import { Button, Typography } from '@/ui'
import auth from '@react-native-firebase/auth'
import React, { useState } from 'react'
import { Modal, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { styles } from './styles'

type Props = {
  visible: boolean
  hideModal: () => any
}

const regPluses = [
  'Сохранять ваши данные',
  'Подстраиваться под ваши интересы',
  'Сохранять ваши действия и любимые места',
  'Предлагать вам что то новое',
  'Помогать разработчикам улучшать приложение',
]

export const AnonymousModal = ({ visible, hideModal }: Props) => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const handleAnonymous = () => {
    setError(null)
    setIsLoading(true)
    auth()
      .signInAnonymously()
      .then(() => {
        setIsLoading(false)
      })
      .catch(() => {
        setError('Что-то пошло не так')
      })
  }
  return (
    <Modal visible={visible} transparent statusBarTranslucent animationType='fade'>
      <View style={styles.wrappwer}>
        <View style={styles.card}>
          <Typography.H2 ph={25} style={{ textAlign: 'center', fontFamily: Fonts.openSansSemiBold }}>
            Вы уверены что хотите продолжить без регистрации?
          </Typography.H2>
          <Typography.Default pv={24}>Без регистрации приложение не будет:</Typography.Default>
          {regPluses.map((item, i) => (
            <Typography.Default key={i}>
              {i + 1}. {item}
            </Typography.Default>
          ))}
          <View style={{ marginTop: 10 }}>
            <Button disabled={loading} buttonStyle={{ marginVertical: 24 }} onPress={hideModal}>
              Вернуться назад
            </Button>
            <View>
              <Button loading={loading} outlined onPress={handleAnonymous}>
                Продолжить
              </Button>
              {error ? (
                <Typography.Description
                  style={{ position: 'absolute', bottom: -22, alignSelf: 'center' }}
                  color={Colors.error}
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
