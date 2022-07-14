import { Colors } from '@/constants'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

const ArrowLeftIcon = () => {
  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <TouchableRipple borderless style={[styles.back, { borderRadius: 20 }]} onPress={handleGoBack}>
      <Icon name='arrow-back' color={Colors.black} size={27} />
    </TouchableRipple>
  )
}

export const Header = (props: any) => {
  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: Colors.white }}>
      <View style={[styles.headerContainer, { backgroundColor: Colors.white }]}>
        <ArrowLeftIcon />
        <Text style={[styles.text, { color: Colors.black }]}>
          {props.options.title ? props.options.title : props.route.name}
        </Text>
      </View>
    </SafeAreaView>
  )
}
