import storage from '@react-native-firebase/storage'
import { useEffect, useState } from 'react'

type Props = {
  placeName: string
}

export const useGetImage = ({ placeName }: Props) => {
  const [loading, setLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState<any>(null)
  useEffect(() => {
    setLoading(true)
    storage()
      .ref(`/places/${placeName}/verified/main.png`)
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url)
        setLoading(false)
      })
      .catch((e) => console.log('Errors while downloading => ', e))
  }, [placeName])

  return { uri: imageUrl, loading }
}
