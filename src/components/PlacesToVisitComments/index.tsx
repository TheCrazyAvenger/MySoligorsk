import { Colors, Screens } from '@/constants'
import { Divider, Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

type Props = {
  data: { user: string; grade: number; comment: string; date: string }[]
  title: string
}

export const PlacesToVisitComments = ({ data, title }: Props) => {
  const navigation = useNavigation<any>()

  const handleGoToComments = () => {
    navigation.navigate(Screens.placesToVisitComments, { title })
  }

  return (
    <View style={styles.container}>
      <Typography.H4 ml={20} mb={10}>
        Отзывы
      </Typography.H4>
      {data.map((item, i) => {
        const { user, comment, grade, date } = item

        return (
          <View key={i}>
            {i !== 0 && <Divider />}
            <View style={styles.commentSection}>
              <Image style={styles.avatar} source={require('@/assets/images/logo.png')} />
              <View>
                <Typography.Default mb={3} type='semiBold'>
                  {user}
                </Typography.Default>
                <View style={styles.commentGrade}>
                  {Array.from(Array(5).keys()).map((item) => {
                    const isColored = item < grade
                    return <Icon key={item} name={'star'} size={16} color={isColored ? 'orange' : Colors.iconGrey} />
                  })}
                  <Typography.Subtitle mt={2} ml={5}>
                    {date}
                  </Typography.Subtitle>
                </View>
              </View>
            </View>
            {comment ? (
              <Typography.Description mt={5} ml={20} numberOfLines={3}>
                {comment}
              </Typography.Description>
            ) : null}
          </View>
        )
      })}

      {data?.length === 5 && (
        <TouchableOpacity onPress={handleGoToComments}>
          <Typography.Default textAlign={'center'} mt={15} mb={3} type='semiBold'>
            Все отзывы
          </Typography.Default>
        </TouchableOpacity>
      )}
    </View>
  )
}
