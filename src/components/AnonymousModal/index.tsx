import { Fonts } from '@/constants'
import { setLogin } from '@/slices/authentication'
import { Button, Typography } from '@/ui'
import React from 'react'
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
  const dispatch = useDispatch()
  const handleAnonymous = () => dispatch(setLogin({ deviceId: '1' }))

  return (
    <Modal visible={visible} transparent statusBarTranslucent animationType='fade'>
      <View style={styles.wrappwer}>
        <View style={styles.card}>
          <Typography.H2 ph={25} style={{ textAlign: 'center', fontFamily: Fonts.openSansSemiBold }}>
            Вы уверены что хотите продолжить без регистрации?
          </Typography.H2>
          <Typography.Default size={16} pv={24}>
            Без регистрации приложение не будет:
          </Typography.Default>
          {regPluses.map((item, i) => (
            <Typography.Default key={i} size={16}>
              {i + 1}. {item}
            </Typography.Default>
          ))}
          <View style={{ marginTop: 10 }}>
            <Button buttonStyle={{ marginVertical: 24 }} onPress={hideModal}>
              Вернуться назад
            </Button>
            <Button outlined onPress={handleAnonymous}>
              Продолжить
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}
