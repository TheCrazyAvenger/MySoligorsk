import { Colors } from '@/constants'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

const ArrowLeftIcon = () => {
  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <TouchableOpacity style={[styles.back]} onPress={() => navigation.goBack()}>
      <Icon name='arrow-back' color={Colors.black} size={28} />
    </TouchableOpacity>
  )
}

export const Header = (props: any) => {
  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: Colors.white }}>
      <View style={[styles.headerContainer]}>
        <ArrowLeftIcon />
        <Text style={styles.text}>{props.options.title ? props.options.title : props.route.name}</Text>
      </View>
    </SafeAreaView>
  )
}
