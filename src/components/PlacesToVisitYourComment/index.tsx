import { Button, Input, Typography } from '@/ui'
import { AirbnbRating } from '@rneui/themed'
import React, { useRef, useState } from 'react'
import { Animated, Image, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { styles } from './styles'

type Props = {
  sendComment: (...args: any) => any
}

const zoomIn = {
  0: {
    opacity: 1,
    scale: 0,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
}

export const PlacesToVisitYourComment = ({ sendComment }: Props) => {
  const [grade, setGrade] = useState(0)
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(true)

  const height = useRef(new Animated.Value(375)).current

  const handleOnChangeText = (value: string) => setValue(value)
  const handleSetGrade = (value: number) => setGrade(value)
  const handleSendComment = () => {
    setLoading(true)
    const comment = {
      user: 'Илья Павлющик',
      grade,
      comment: value,
      date: new Date().toString(),
    }
    sendComment(comment)
    Animated.timing(height, { toValue: 0, duration: 700, useNativeDriver: false }).start(() => {
      setVisible(false)
      setLoading(false)
    })
  }

  return visible ? (
    <Animated.View style={{ height, overflow: 'hidden' }}>
      <View style={styles.container}>
        <Typography.Default style={styles.contentTitle}>Ваш отзыв</Typography.Default>
        <Typography.Default mb={20} style={{ fontSize: 16 }}>
          Поделитесь вашими впечатлениями
        </Typography.Default>
        <Animatable.View animation={zoomIn} duration={700} delay={100}>
          <View style={styles.reviewHeader}>
            <Image style={styles.avatar} source={require('@/assets/images/logo.png')} />
            <AirbnbRating
              isDisabled={loading}
              onFinishRating={handleSetGrade}
              showRating={false}
              defaultRating={0}
              size={30}
              selectedColor={'orange'}
            />
          </View>
          <Typography.Description textAlign={'right'} mr={20} mb={-10}>
            {value.length}/250
          </Typography.Description>
          <Input.Default
            disabled={loading}
            value={value}
            onChangeText={handleOnChangeText}
            multiline
            placeholder='Ваш отзыв'
            inputContainerStyle={{ marginTop: 15 }}
            maxLength={250}
          />

          <Button
            loading={loading}
            onPress={handleSendComment}
            disabled={grade === 0}
            buttonStyle={{ marginBottom: -5 }}
          >
            Отправить
          </Button>
        </Animatable.View>
      </View>
    </Animated.View>
  ) : (
    <View />
  )
}
