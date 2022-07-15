import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { TouchableRipple, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

const ArrowLeftIcon = ({ color }: any) => {
  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <TouchableRipple borderless style={[styles.back, { borderRadius: 20 }]} onPress={handleGoBack}>
      <Icon name='arrow-back' color={color} size={27} />
    </TouchableRipple>
  )
}

export const Header = (props: any) => {
  const { colors }: any = useTheme()

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: colors.navigation }}>
      <View style={[styles.headerContainer, { backgroundColor: colors.navigation }]}>
        <ArrowLeftIcon color={colors.text} />
        <Text style={[styles.text, { color: colors.text }]}>
          {props.options.title ? props.options.title : props.route.name}
        </Text>
      </View>
    </SafeAreaView>
  )
}
