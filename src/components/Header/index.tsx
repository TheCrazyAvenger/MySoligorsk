import { Colors } from '@/constants'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

const ArrowLeftIcon = ({ dark }: any) => {
  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <TouchableRipple borderless style={[styles.back, { borderRadius: 20 }]} onPress={handleGoBack}>
      <Icon name='arrow-back' color={dark ? Colors.white : Colors.black} size={27} />
    </TouchableRipple>
  )
}

export const Header = (props: any) => {
  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: props.dark ? Colors.black : Colors.white }}>
      <View style={[styles.headerContainer, { backgroundColor: props.dark ? Colors.black : Colors.white }]}>
        <ArrowLeftIcon dark={props.dark} />
        <Text style={[styles.text, { color: props.dark ? Colors.white : Colors.black }]}>
          {props.options.title ? props.options.title : props.route.name}
        </Text>
      </View>
    </SafeAreaView>
  )
}
