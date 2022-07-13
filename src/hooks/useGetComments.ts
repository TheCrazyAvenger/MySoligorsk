import { selectToken } from '@/selectors'
import firestore from '@react-native-firebase/firestore'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

type Props = {
  placeName: string
  size?: number
}

interface Comment {
  user: string
  grade: number
  comment: string
  date: string
}

export const useGetComments = ({ placeName, size = 10 }: Props) => {
  const [commentsArr, setCommentsArr] = useState<any>([])
  const [userComment, setUserComment] = useState<Comment | null>(null)
  const [matchesLength, setMatchesLength] = useState(0)
  const [avarageRate, setAverageRate] = useState(0)
  const [loading, setLoading] = useState(false)

  const token = useSelector(selectToken)

  const onResult = async (response: any) => {
    const data = await response.data()

    await setCommentsArr([
      ...Object.values(data)

        .filter((item: any) => {
          if (item?.uid === token) {
            setUserComment(item)
            return false
          } else {
            return true
          }
        })
        .slice(0, size)
        .reverse(),
    ])

    await setAverageRate(commentsArr.reduce((acc: number, next: any) => acc + next.grade, 0) / commentsArr.length)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    firestore().collection('Comments').doc(placeName).onSnapshot(onResult)
  }, [])

  return { comments: commentsArr, loading, userComment, avarageRate }
}
