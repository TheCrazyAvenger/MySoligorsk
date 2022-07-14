import { Fonts } from '@/constants'
import { Button, Complete, Typography } from '@/ui'
import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import { styles } from './styles'

export const CompleteScreen = () => {
  const route = useRoute<any>()
  const navigation = useNavigation()
  const { title, description } = route.params

  const handleGoBack = () => navigation.goBack()

  return (
    <View style={styles.container}>
      <Complete />
      <Typography.H3 mt={-10}>{title}</Typography.H3>
      <Typography.H4 mt={10} textAlign={'center'} style={[{ fontFamily: Fonts.openSansRegular }]}>
        {description}
      </Typography.H4>

      <Button onPress={handleGoBack} buttonStyle={styles.button}>
        Продолжить
      </Button>
    </View>
  )
}
