import storage from '@react-native-firebase/storage'
import { useState } from 'react'

type Props = {
  placeName: string
  token: string
}

export const useSendImage = ({ placeName, token }: Props) => {
  const [loading, setLoading] = useState(false)

  const sendPhoto = async ({ result, callback }: any) => {
    setLoading(true)
    await result?.assets?.slice(0, 6).map((item: any) => {
      const photoUri = item.uri
      const fileName = `${placeName}_${token}_${Math.random()}`
      const reference = storage().ref(`/places/${placeName}/unverified/${fileName}`)
      reference.putFile(photoUri).catch((e) => {
        setLoading(false)
        console.log('Errors while downloading => ', e)
      })
    })
    setLoading(false)
    callback && callback()
  }

  return { sendPhoto, loading }
}
