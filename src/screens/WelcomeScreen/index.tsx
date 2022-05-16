import { AnonymousModal } from '@/components'
import { CustomTooltip } from '@/components/ToolTip'
import { Fonts, Screens } from '@/constants'
import { Button, Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, View } from 'react-native'
import { styles } from './styles'

const regTooltipMessage =
  'Регистрация позволит нам подобрать информацию и места, подходящие именно вам. А также вы сможете не потерять свои данные, например, при заходе в приложение с другого девайса'

export const WelcomeScreen = () => {
  const navigation = useNavigation<any>()
  const [showModal, setShowModal] = useState(false)
  const handleOpenAnonimousModal = () => setShowModal(true)
  const handleCloseAnonimousModal = () => setShowModal(false)

  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: false }).start()
  }, [])

  const handleGoToSignUp = () => navigation.navigate(Screens.signUp)
  const handleGoToSignIn = () => navigation.navigate(Screens.signIn)

  return (
    <>
      <AnonymousModal visible={showModal} hideModal={handleCloseAnonimousModal} />

      <Animated.View style={[styles.container, { opacity }]}>
        <View>
          <Typography.TitleText lineH={50.73} style={[styles.text, { fontFamily: Fonts.openSansBold }]} size={38}>
            Добро пожаловать в Мой Солигорск
          </Typography.TitleText>
          <Typography.Default size={15} mt={24} style={styles.text}>
            Самый легкий и удобный спутник по нашему любимому городу, как для постоянных жителей, так и для туристов!
          </Typography.Default>
        </View>
        <View>
          <CustomTooltip message={regTooltipMessage}>
            <Typography.Default color={'#767575'} mb={16} style={[styles.text, { textDecorationLine: 'underline' }]}>
              Для чего нужна регистрация?
            </Typography.Default>
          </CustomTooltip>

          <Button buttonStyle={{ marginBottom: 24 }} onPress={handleGoToSignUp}>
            Зарегистрироваться
          </Button>
          <Button outlined buttonStyle={{ marginBottom: 24 }} onPress={handleOpenAnonimousModal}>
            Продолжить без регистрации
          </Button>
          <Button onPress={handleGoToSignIn}>Войти</Button>
        </View>
      </Animated.View>
    </>
  )
}
