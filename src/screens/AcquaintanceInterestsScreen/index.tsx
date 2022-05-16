import { Colors, Fonts, interests, Screens } from '@/constants'
import { Button, Typography } from '@/ui'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from './styles'

const getIcon = (name: string, type: string, color: string = Colors.black) => {
  return type === 'Ion' ? (
    <IonIcon color={color} name={name} size={55} />
  ) : (
    <MaterialIcon color={Colors.black} name={name} size={55} />
  )
}

export const AcquaintanceInterestsScreen = () => {
  const route = useRoute()
  const navigation = useNavigation<any>()

  const [selectedInterests, setSelectedInterests] = useState<string[] | []>([])
  const handleAddInterest = (name: string) => setSelectedInterests((prev: any) => [...prev, name])
  const handleRemoveInterest = (name: string) =>
    setSelectedInterests((prev: any) => prev.filter((item: any) => item !== name))

  const InterestsItem = ({ item }: any) => {
    const { fillColor, icon, iconColor, iconType, title } = item

    const isSelected = selectedInterests.findIndex((item: any) => item === title) !== -1

    const handlePress = () => (isSelected ? handleRemoveInterest(title) : handleAddInterest(title))

    return (
      <View>
        <TouchableOpacity onPress={handlePress} style={{ alignItems: 'center' }}>
          {isSelected && (
            <View style={[styles.interestsItem, styles.interestsItemSelected]}>
              {getIcon('checkmark', 'Ion', Colors.white)}
            </View>
          )}
          <View style={[styles.interestsItem, { backgroundColor: fillColor }]}>
            {getIcon(icon, iconType, iconColor)}
          </View>
          <Typography.Default mb={30} style={{ fontFamily: Fonts.openSansSemiBold }} textAlign={'center'}>
            {title}
          </Typography.Default>
        </TouchableOpacity>
      </View>
    )
  }

  console.log(selectedInterests)

  const handleGoNext = () => navigation.navigate(Screens.acquaintanceBirthDate, { data: { ...route.params } })

  return (
    <>
      <ScrollView style={[styles.container]}>
        <Typography.TitleText
          mt={131}
          lineH={50.73}
          style={[styles.text, { fontFamily: Fonts.openSansBold }]}
          size={38}
        >
          Чем вы увлекаетесь?
        </Typography.TitleText>
        <Typography.Default size={15} mb={30} mt={24} style={styles.text}>
          Выберите хотя бы одно увлечение, чтобы мы смогли подбирать для вас наиболее удобные и подходящие места
        </Typography.Default>
        <View style={styles.interestsContainer}>
          {interests.map((item) => (
            <InterestsItem item={item} />
          ))}
        </View>
      </ScrollView>
      <Button disabled={selectedInterests.length === 0} buttonStyle={styles.nextButton} onPress={() => {}}>
        Далее
      </Button>
    </>
  )
}
