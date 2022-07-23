import { FormImagePicker } from '@/components'
import { Screens } from '@/constants'
import { useSendImage } from '@/hooks'
import { selectToken, selectUser } from '@/selectors'
import { Button, Input, Spinner, Typography } from '@/ui'
import firestore from '@react-native-firebase/firestore'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { AirbnbRating } from 'react-native-elements'
import { Snackbar, useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { styles } from './styles'

export const PlacesToVisitEditCommentsScreen = () => {
  const route = useRoute<any>()
  const navigation = useNavigation<any>()
  const token = useSelector(selectToken)
  const { grade, title, isEdit = false, comment = null } = route.params
  const { firstname, lastname } = useSelector(selectUser)
  const { colors } = useTheme()

  const buttonTitle = isEdit ? 'Изменить' : 'Отправить'

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const handleHideSnackBar = () => setError(null)

  const { sendPhoto } = useSendImage({ placeName: title, token })

  const [userGrade, setUserGrade] = useState(grade)
  const handleSetGrade = (value: number) => setUserGrade(Number(value))
  useEffect(() => {
    setUserGrade(grade)
  }, [grade])

  const [value, setValue] = useState(isEdit ? comment.comment : '')
  const handleOnChangeText = (value: string) => setValue(value)

  const [uris, setUris] = useState<any>([])
  const addImageHandler = (uri: string) => {
    setUris((prev: any) => [...prev, uri].slice(0, 6))
  }
  const removeImageHandler = (uri: string) => {
    setUris((prev: any) => prev.filter((currentUri: string) => currentUri !== uri))
  }

  const handleSendComment = async () => {
    setError(null)
    setLoading(true)
    const comment = {
      user: `${firstname} ${lastname}`,
      grade: userGrade,
      comment: value.trim(),
      date: new Date().toLocaleDateString(),
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
      .catch(() => {
        setError('Что-то пошло не так')
        setLoading(false)
      })

    uris && sendPhoto({ result: { assets: [...uris.map((uri: any) => ({ uri }))] } })
    // setLoading(false)
    handleComplete()
  }

  const handleGoBack = () => navigation.goBack()
  const handleComplete = () =>
    navigation.replace(Screens.completeScreen, {
      title: isEdit ? 'Комментарий изменен' : 'Комментарий отправлен',
      description: 'Спасибо, что помогаете другим пользователям',
    })

  return (
    <View style={{ flex: 1 }}>
      {loading && <Spinner />}
      <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
        <View style={styles.inner}>
          <Typography.Default mt={20} mb={20}>
            Ваш отзыв будет виден всем пользователям
          </Typography.Default>
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
        </View>
        <FormImagePicker uris={uris} title={title} addHandler={addImageHandler} removeHandler={removeImageHandler} />
      </ScrollView>
      <View style={[styles.buttons, { backgroundColor: colors.background }]}>
        <Button
          loading={loading}
          onPress={handleSendComment}
          disabled={userGrade === 0}
          buttonStyle={{ marginBottom: 20 }}
        >
          {buttonTitle}
        </Button>
        <Button outlined onPress={handleGoBack}>
          Отмена
        </Button>
      </View>
      <Snackbar
        visible={!!error}
        onDismiss={handleHideSnackBar}
        style={{ zIndex: 1000 }}
        action={{
          label: 'Окей',
        }}
      >
        {error}
      </Snackbar>
    </View>
  )
}
