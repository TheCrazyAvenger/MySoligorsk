import { OtherSelectedModal } from '@/components'
import { Colors, Fonts, interests, Screens } from '@/constants'
import { shuffle } from '@/helpers'
import { selectOtherInterestSelected } from '@/selectors/applicationSettings'
import { setHiddenInterest, setInterest } from '@/slices'
import { setOtherInterestSelected } from '@/slices/applicationSettings'
import { Button, Spinner, Typography } from '@/ui'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useMemo, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { TouchableRipple, useTheme } from 'react-native-paper'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { styles } from './styles'

const getIcon = (name: string, type: string, color: string = Colors.black) => {
  return type === 'Ion' ? (
    <IonIcon color={color} name={name} size={55} />
  ) : (
    <MaterialIcon color={Colors.black} name={name} size={55} />
  )
}

const otherObject = {
  id: 21,
  fillColor: '#000',
  title: 'Другое',
  icon: 'help',
  iconColor: Colors.white,
  iconType: 'Ion',
}

export const AcquaintanceInterestsScreen = () => {
  const { colors } = useTheme()
  const route: any = useRoute()
  const navigation = useNavigation<any>()
  const otherInterestSelected = useSelector(selectOtherInterestSelected)
  const dispatch = useDispatch()
  const [showOtherModal, setShowOtherModal] = useState(false)

  const [selectedInterests, setSelectedInterests] = useState<string[] | []>(
    route?.params?.hiddenInterests ?? route?.params?.interests ?? []
  )
  const title = route?.params?.hiddenInterests
    ? 'Скрыть интерес'
    : route?.params?.interests
    ? 'Добавить интерес'
    : 'Чем вы увлекаетесь?'

  const handleAddInterest = (name: string) => setSelectedInterests((prev: any) => [...prev, name])
  const handleRemoveInterest = (name: string) =>
    setSelectedInterests((prev: any) => prev.filter((item: any) => item !== name))

  const [loading, setLoading] = useState(false)
  const handleSetInterests = async () => {
    const uid = auth().currentUser?.uid
    setLoading(true)

    await firestore()
      .collection('Users')
      .doc(uid)
      .update({
        interests: selectedInterests,
      })
      .then(() => {
        dispatch(setInterest(selectedInterests))
        setLoading(false)
        navigation.goBack()
        navigation.goBack()
        navigation.navigate(Screens.myInterests)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const handleSetHiddenInterests = async () => {
    const uid = auth().currentUser?.uid
    setLoading(true)

    await firestore()
      .collection('Users')
      .doc(uid)
      .update({
        hiddenInterests: selectedInterests,
      })
      .then(() => {
        dispatch(setHiddenInterest(selectedInterests))
        setLoading(false)
        navigation.goBack()
        navigation.goBack()
        navigation.navigate(Screens.myInterests)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const handleGoNext = () => {
    const isOther = selectedInterests.findIndex((interest) => interest === 'Другое')

    if (isOther !== -1 && !otherInterestSelected && !route.params.interests) {
      setShowOtherModal(true)
    } else {
      selectedInterests.length > 0 &&
        (route?.params?.hiddenInterests
          ? handleSetHiddenInterests()
          : route.params.interests
          ? handleSetInterests()
          : navigation.navigate(Screens.acquaintanceAddress, {
              data: { ...route.params?.data, interests: selectedInterests },
            }))
    }
  }

  const InterestsItem = ({ item }: any) => {
    const { fillColor, icon, iconColor, iconType, title } = item

    const isSelected = selectedInterests.findIndex((item: any) => item === title) !== -1

    const handlePress = () => (isSelected ? handleRemoveInterest(title) : handleAddInterest(title))

    return (
      <View style={[styles.interestsItem]}>
        <TouchableRipple borderless onPress={handlePress} style={{ borderRadius: 42.5 }}>
          <View>
            {isSelected && (
              <View style={[styles.icon, styles.interestsItemSelected]}>
                {getIcon('checkmark', 'Ion', Colors.white)}
              </View>
            )}
            <View style={[styles.icon, { backgroundColor: fillColor }]}>{getIcon(icon, iconType, iconColor)}</View>
          </View>
        </TouchableRipple>
        <Typography.Default mb={30} type='semiBold' textAlign={'center'}>
          {title}
        </Typography.Default>
      </View>
    )
  }

  const shuffledInterests = useMemo(
    () =>
      shuffle(
        route?.params?.hiddenInterests
          ? interests.filter((item) => {
              const indexOfInterest = route?.params?.interests.findIndex((interest: string) => item.title === interest)

              if (indexOfInterest !== -1) {
                return false
              }
              return true
            })
          : interests
      ),
    []
  )
  const handleHideOtherModal = () => {
    dispatch(setOtherInterestSelected(true))
    setShowOtherModal(false)
    selectedInterests.length > 0 &&
      navigation.navigate(Screens.acquaintanceAddress, {
        data: { ...route.params?.data, interests: selectedInterests },
      })
  }

  return (
    <View style={{ flex: 1 }}>
      {loading && <Spinner />}
      <OtherSelectedModal visible={showOtherModal} hideModal={handleHideOtherModal} />
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <Typography.TitleText mt={50} lineH={50.73} style={[styles.text, { fontFamily: Fonts.openSansBold }]} size={38}>
          {title}
        </Typography.TitleText>

        <Typography.Default mb={30} mt={24} style={styles.text}>
          Выберите хотя бы одно увлечение, чтобы мы смогли подбирать для вас наиболее удобные и подходящие места
        </Typography.Default>
        <View style={styles.interestsContainer}>
          {shuffledInterests.map((item: any) => (
            <InterestsItem key={item.id} item={item} />
          ))}
          {!route?.params?.hiddenInterests ? <InterestsItem item={otherObject} /> : null}
        </View>
      </ScrollView>
      <Button disabled={selectedInterests.length === 0} buttonStyle={styles.nextButton} onPress={handleGoNext}>
        Далее
      </Button>
    </View>
  )
}
