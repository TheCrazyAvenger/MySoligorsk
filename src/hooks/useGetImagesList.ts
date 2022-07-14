import storage from '@react-native-firebase/storage'
import { useEffect, useState } from 'react'

type Props = {
  placeName: string
  size: number
}

export const useGetImagesList = ({ placeName, size }: Props) => {
  const [loading, setLoading] = useState(true)
  const [imageUrls, setImageUrls] = useState<any>(null)

  const reference = storage().ref(`/places/${placeName}/verified`)

  const getSampleImage = async () => {
    setLoading(true)
    const imageRefs = await reference.listAll()
    const urls = await Promise.all(imageRefs.items.slice(0, size).map((ref) => ref.getDownloadURL()))
    setImageUrls(urls)
    setLoading(false)
  }

  useEffect(() => {
    getSampleImage()
  }, [placeName, size])

  return { uris: imageUrls, loading }
}
