import { Screens } from '@/constants'
import { SendErrorForm } from '@/forms'
import { useSendImage } from '@/hooks'
import { selectToken, selectUser } from '@/selectors'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Snackbar } from 'react-native-paper'
import { useSelector } from 'react-redux'

export const SendErrorScreen = () => {
  const navigation = useNavigation<any>()
  const { firstname, lastname, email } = useSelector(selectUser)
  const token = useSelector(selectToken)
  const initialValues = { firstname, lastname, email, message: '' }

  const [uris, setUris] = useState<any>([])
  const addImageHandler = (uri: string) => {
    setUris((prev: any) => [...prev, uri].slice(0, 6))
  }
  const removeImageHandler = (uri: string) => {
    setUris((prev: any) => prev.filter((currentUri: string) => currentUri !== uri))
  }

  const ref = `reports/messages/${token}`

  const { sendPhoto, error: a } = useSendImage({ placeName: 'report', ref, token })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const handleHideSnackBar = () => setError(null)

  const handleSendComment = async (values: any) => {
    const { firstname, lastname, email, message } = values
    setError(null)
    setLoading(true)
    const comment = {
      user: `${firstname} ${lastname}`,
      email,
      message: message.trim(),
      date: new Date().toLocaleDateString(),
      uid: token,
    }
    await firestore()
      .collection('Reports')
      .doc('Messages')
      .collection(token)
      .add(comment)
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setError('Что-то пошло не так')
        setLoading(false)
      })

    uris && sendPhoto({ result: { assets: [...uris.map((uri: any) => ({ uri }))] } })
    // setLoading(false)
    handleComplete()
  }

  const handleComplete = () =>
    navigation.replace(Screens.completeScreen, {
      title: 'Сообщение отправлено',
      description: 'Наши модераторы свяжутся с вами в ближайшее время.',
    })

  return (
    <>
      <SendErrorForm
        onSubmit={handleSendComment}
        loading={loading}
        initialValues={initialValues}
        addImageHandler={addImageHandler}
        removeImageHandler={removeImageHandler}
        uris={uris}
      />
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
    </>
  )
}
