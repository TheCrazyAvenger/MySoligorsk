import { Screens } from '@/constants'
import { MyInformationForm } from '@/forms'
import { useSendImage } from '@/hooks'
import { selectToken, selectUser } from '@/selectors'
import { setUser } from '@/slices'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Snackbar } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

export const MyInformationScreen = () => {
  const navigation = useNavigation<any>()
  const { interests, email, hiddenInterests } = useSelector(selectUser)
  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  const initialValues = { firstname: '', lastname: '', avatar: '', location: {}, birthDate: '', street: '', house: '' }

  const ref = `avatars/${token}`
  const filename = 'profile-avatar'
  const { sendPhoto } = useSendImage({ filename, ref, token })

  const imageRef = `avatars/${token}/profile-avatar`

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const handleHideSnackBar = () => setError(null)

  const handleSendComment = async (values: any) => {
    try {
      const { firstname, lastname, avatar, location, birthDate, street, house } = values
      setError(null)
      setLoading(true)

      await firestore()
        .collection('Users')
        .doc(token)
        .update({
          firstname,
          lastname,
          location,
          address:
            street && house
              ? {
                  street,
                  house,
                }
              : null,
          birthDate,
        })
        .then(() => {
          setLoading(false)
        })
        .catch(() => {
          setError('Что-то пошло не так')
          setLoading(false)
        })

      avatar !==
        'https://firebasestorage.googleapis.com/v0/b/mysoligorsk-80c01.appspot.com/o/avatars%2Fblank-profile.png?alt=media&token=27da88d9-dc49-4cab-80aa-8f25a14dd203' &&
        (await sendPhoto({ result: { assets: [{ uri: avatar }] } }).then(() => {
          const reference = storage().ref(imageRef)
          reference
            .getDownloadURL()
            .then((url) => {
              firestore()
                .collection('Users')
                .doc(token)
                .update({ avatar: url })
                .then(() => {
                  dispatch(setUser({ firstname, lastname, interests, avatar: url, email, hiddenInterests }))
                })
            })
            .catch((e) => {
              console.log('Errors while downloading => ', e)
            })
        }))

      // setLoading(false)
      handleComplete()
    } catch {
      setError('Что-то пошло не так')
      setLoading(false)
    }
  }

  const handleComplete = () =>
    navigation.replace(Screens.completeScreen, {
      title: 'Информация изменена',
      description: 'Вы успешно изминили свои данные',
    })

  return (
    <>
      <MyInformationForm onSubmit={handleSendComment} loading={loading} initialValues={initialValues} />
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
