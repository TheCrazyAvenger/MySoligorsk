import { MyInterestsItem } from '@/components'
import { Button, Spinner, Typography } from '@/ui'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { useTheme } from 'react-native-paper'
import { styles } from './styles'

export const MyInterestsScreen = () => {
  const { colors } = useTheme()
  const [loading, setLoading] = useState(false)

  const [interests, setInterest] = useState<string[] | []>([])
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
      })
      .catch(() => setLoadingInterest(false))
  }

  useEffect(() => {
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
      <Button buttonStyle={styles.button} icon='add-circle'>
        Добавить
      </Button>
    </ScrollView>
  )
}
