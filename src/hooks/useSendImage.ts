import storage from '@react-native-firebase/storage'
import { useState } from 'react'

type Props = {
  placeName?: string
  token: string
  ref?: string
}

export const useSendImage = ({ ref, placeName, token }: Props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const cleanError = () => setError(null)

  const sendPhoto = async ({ result, callback }: any) => {
    setLoading(true)
    setError(null)
    await result?.assets?.slice(0, 6).map((item: any) => {
      const photoUri = item.uri
      const fileName = `${placeName}_${token}_${Math.random()}`
      const reference = storage().ref(ref ? `${ref}/${fileName}` : `/places/${placeName}/unverified/${fileName}`)
      reference.putFile(photoUri).catch(() => {
        setError('Что-то пошло не так')
        setLoading(false)
      })
    })

    setLoading(false)
    error === null && callback && callback()
  }

  return { sendPhoto, loading, error, cleanError }
}
