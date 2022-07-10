import { Button, Input, Typography } from '@/ui'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { AirbnbRating } from 'react-native-elements'
import { styles } from './styles'

type Props = {
  handleClose: (...args: any) => any
  sendComment: (...args: any) => any
  grade: number
}

export const PlacesToVisitEditComments = ({ grade, sendComment, handleClose }: Props) => {
  const [loading, setLoading] = useState(false)

  const [userGrade, setUserGrade] = useState(grade)
  const handleSetGrade = (value: number) => setUserGrade(Number(value))
  useEffect(() => {
    setUserGrade(grade)
  }, [grade])

  const [value, setValue] = useState('')
  const handleOnChangeText = (value: string) => setValue(value)

  const handleSendComment = () => {
    setLoading(true)
    const comment = {
      user: 'Илья Павлющик',
      grade: userGrade,
      comment: value.trim(),
      date: new Date().toString(),
    }
    sendComment(comment)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
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

        <Button loading={loading} onPress={handleSendComment} disabled={grade === 0} buttonStyle={{ marginBottom: 20 }}>
          Отправить
        </Button>
        <Button outlined onPress={handleClose} disabled={grade === 0}>
          Отмена
        </Button>
      </View>
    </View>
  )
}
