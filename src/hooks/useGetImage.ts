import storage from '@react-native-firebase/storage'
import { useEffect, useState } from 'react'

type Props = {
  placeName: string
}

export const useGetImage = ({ placeName }: Props) => {
  const [loading, setLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState<any>(null)

  const reference = storage().ref(`/places/${placeName}/verified/main.png`)

  useEffect(() => {
    setLoading(true)
    reference
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url)
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
        console.log('Errors while downloading => ', e)
      })
  }, [placeName])

  return { uri: imageUrl, loading }
}
