import { FormImagePicker } from '@/components/FormImagePicker'
import { Colors } from '@/constants'
import { useSendImage } from '@/hooks'
import { selectToken } from '@/selectors'
import { Button, Input, Typography } from '@/ui'
import firestore from '@react-native-firebase/firestore'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { AirbnbRating } from 'react-native-elements'
import { Snackbar } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { styles } from './styles'

export const PlacesToVisitEditCommentsScreen = () => {
  const route = useRoute<any>()
  const navigation = useNavigation()

  const token = useSelector(selectToken)

  const [loading, setLoading] = useState(false)

  const { grade, title } = route.params

  const { loading: loadingPhoto, sendPhoto } = useSendImage({ placeName: title, token })

  const [userGrade, setUserGrade] = useState(grade)
  const handleSetGrade = (value: number) => setUserGrade(Number(value))
  useEffect(() => {
    setUserGrade(grade)
  }, [grade])

  const [value, setValue] = useState('')
  const handleOnChangeText = (value: string) => setValue(value)

  const [uris, setUris] = useState<any>([])

  const addImageHandler = (uri: string) => {
    setUris((prev: any) => [...prev, uri].slice(0, 6))
  }
  const removeImageHandler = (uri: string) => {
    setUris((prev: any) => prev.filter((currentUri: string) => currentUri !== uri))
  }

  const [visibleSnackBar, setVisibleSnackBar] = React.useState(false)
  const handleHideSnackBar = () => setVisibleSnackBar(false)
  const handleShowSnackBar = () => setVisibleSnackBar(true)

  const handleSendComment = async () => {
    setLoading(true)
    const comment = {
      user: 'Илья Павлющик',
      grade: userGrade,
      comment: value.trim(),
      date: new Date().toString(),
      uid: token,
    }
    await firestore()
      .collection('Comments')
      .doc(title)
      .get()
      .then((comments: any) => {
        firestore()
          .collection('Comments')
          .doc(title)
          .update({ ...comments.data(), [token]: comment })
      })
      .catch(() => setLoading(false))

    uris && (await sendPhoto({ result: { assets: [...uris.map((uri: any) => ({ uri }))] } }))
    setLoading(false)
    handleShowSnackBar()
    handleGoBack()
  }

  const handleGoBack = () => navigation.goBack()

  return (
    <ScrollView style={{ backgroundColor: Colors.white }} contentContainerStyle={styles.container}>
      <Typography.H4>Ваш отзыв</Typography.H4>
      <Typography.Default mb={20}>Ваш отзыв будет виден всем пользователям</Typography.Default>
      <View>
        <Typography.Default type='semiBold' mb={10}>
          Оценка
        </Typography.Default>
        <View style={styles.reviewHeader}>
          <AirbnbRating
            isDisabled={loading}
            onFinishRating={handleSetGrade}
            showRating={false}
            defaultRating={grade}
            size={35}
            selectedColor={'orange'}
          />
        </View>
        <View style={styles.commentHeader}>
          <Typography.Default type='semiBold'>Комментарий</Typography.Default>
          <Typography.Description ml={5} lineH={22}>
            {value.length}/250
          </Typography.Description>
        </View>
        <Input.Default
          disabled={loading}
          value={value}
          onChangeText={handleOnChangeText}
          multiline
          placeholder='Ваш отзыв'
          maxLength={250}
        />
      </View>
      <FormImagePicker uris={uris} addHandler={addImageHandler} removeHandler={removeImageHandler} />

      <Button loading={loading} onPress={handleSendComment} disabled={grade === 0} buttonStyle={{ marginBottom: 20 }}>
        Отправить
      </Button>
      <Button outlined onPress={handleGoBack} disabled={grade === 0}>
        Отмена
      </Button>
      <Snackbar
        visible={visibleSnackBar}
        onDismiss={handleHideSnackBar}
        style={{ zIndex: 1000 }}
        action={{
          label: 'Окей',
        }}
      >
        Отзыв отправлен
      </Snackbar>
    </ScrollView>
  )
}
