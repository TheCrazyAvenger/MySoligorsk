import { MyInterestsItem } from '@/components'
import { Screens } from '@/constants'
import { Button, Spinner, Typography } from '@/ui'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { styles } from './styles'

export const MyInterestsScreen = () => {
  const navigation = useNavigation<any>()
  const { colors } = useTheme()
  const [loading, setLoading] = useState(false)

  const [interests, setInterest] = useState<string[] | []>([])
  const [hiddenInterests, setHiddenInterests] = useState<string[] | []>([])
  const [loadingInterests, setLoadingInterest] = useState(false)

  const handleGetInterests = async () => {
    setLoadingInterest(true)
    const uid = auth().currentUser?.uid
    await firestore()
      .collection('Users')
      .doc(uid)
      .get()
      .then((item: any) => {
        setLoadingInterest(false)
        setInterest(item.data().interests)
        setHiddenInterests(item.data().hiddenInterests)
      })
      .catch(() => setLoadingInterest(false))
  }

  useEffect(() => {
    // auth().currentUser?.updateProfile({})
    handleGetInterests()
  }, [])

  const handleRemoveInterest = async (interest: string) => {
    const uid = auth().currentUser?.uid
    setLoading(true)

    const filteredInterests = interests!.filter((item: string) => item !== interest)

    await firestore()
      .collection('Users')
      .doc(uid)
      .update({
        interests: filteredInterests,
      })
      .then(() => {
        setInterest(filteredInterests)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const handleRemoveHiddenInterest = async (interest: string) => {
    const uid = auth().currentUser?.uid
    setLoading(true)

    const filteredInterests = hiddenInterests!.filter((item: string) => item !== interest)

    await firestore()
      .collection('Users')
      .doc(uid)
      .update({
        hiddenInterests: filteredInterests,
      })
      .then(() => {
        setHiddenInterests(filteredInterests)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const handleGoToInterests = () => navigation.navigate(Screens.acquaintanceInterests, { interests })
  const handleGoToHiddenInterests = () =>
    navigation.navigate(Screens.acquaintanceInterests, { interests, hiddenInterests })

  return loadingInterests ? (
    <Spinner />
  ) : (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ marginTop: 20, paddingHorizontal: 20 }}
    >
      <Typography.Default>
        Здесь находятся ваши увлечения, выбранные при регистрации. Вы можете добавить новые, или скрыть то, что вам
        неинтересно
      </Typography.Default>
      <MyInterestsItem data={interests!} title={'Выбранные'} onRemove={handleRemoveInterest} loading={loading} />
      <Button onPress={handleGoToInterests} buttonStyle={styles.button} icon='add-circle'>
        Добавить
      </Button>
      <MyInterestsItem
        data={hiddenInterests}
        title={'Скрытые'}
        onRemove={handleRemoveHiddenInterest}
        loading={loading}
      />
      <Button
        onPress={handleGoToHiddenInterests}
        buttonStyle={[styles.button, { backgroundColor: colors.error }]}
        icon='add-circle'
      >
        Добавить
      </Button>
      <View style={{ marginBottom: 50 }} />
    </ScrollView>
  )
}
