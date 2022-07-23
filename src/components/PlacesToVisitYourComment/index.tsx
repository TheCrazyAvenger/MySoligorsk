import { Colors, Screens } from '@/constants'
import { selectToken, selectUser } from '@/selectors'
import { BottomSheet, Button, Spinner, Typography } from '@/ui'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { AirbnbRating } from '@rneui/themed'
import React, { useState } from 'react'
import { Image, Modal, View } from 'react-native'
import { TouchableRipple, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import { styles } from './styles'

type Props = {
  handleSetGrade: (...args: any) => any
  grade: number
  comment: any
  title: string
}

export const PlacesToVisitYourComment = ({ handleSetGrade, grade, comment, title }: Props) => {
  const navigation = useNavigation<any>()
  const token = useSelector(selectToken)
  const { avatar } = useSelector(selectUser)
  const { colors }: any = useTheme()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const handleHideSnackBar = () => setError(null)

  const handleEditComment = () => {
    setIsMenuVisible(false)
    navigation.navigate(Screens.placesToVisitEditComments, { isEdit: true, comment, title, grade: comment.grade })
  }

  const handleDeleteComment = async () => {
    setError(null)
    setLoading(true)

    await firestore()
      .collection('Comments')
      .doc(title)
      .update({
        [token]: firestore.FieldValue.delete(),
      })
      .catch(() => {
        setError('Что-то пошло не так')
        setLoading(false)
      })
    setLoading(false)
    setIsMenuVisible(false)
    handleComplete()
  }

  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const menuData = [
    { title: 'Редактировать', icon: 'pencil', onPress: handleEditComment },
    { title: 'Удалить', icon: 'trash', onPress: handleDeleteComment, isSelected: true },
  ]

  const handleOpenMenu = () => {
    handleHideSnackBar()
    setIsMenuVisible(true)
  }

  const handleComplete = () =>
    navigation.navigate(Screens.completeScreen, {
      title: 'Комментарий удален',
      description: 'Ваш комментарий больше не будет виден другим пользователям',
    })

  return (
    <View style={styles.container}>
      <Modal visible={loading}>
        <Spinner />
      </Modal>
      <BottomSheet
        error={error}
        hideError={handleHideSnackBar}
        selectedColor={colors.error}
        data={menuData}
        onClose={setIsMenuVisible}
        isVisible={isMenuVisible}
      />
      <Typography.H4>Ваш отзыв</Typography.H4>
      {comment && (
        <TouchableRipple
          style={{ position: 'absolute', top: 26, right: 20, borderRadius: 20 }}
          borderless
          onPress={handleOpenMenu}
        >
          <Icon name={'ellipsis-horizontal'} size={30} color={colors.grey} />
        </TouchableRipple>
      )}
      {!comment && <Typography.Default mb={10}>Поделитесь вашими впечатлениями</Typography.Default>}
      {comment ? (
        <View style={styles.comment}>
          <View style={styles.commentSection}>
            <Image style={styles.avatar} source={{ uri: avatar }} />
            <View>
              <Typography.Default mb={3} type='semiBold'>
                {comment.user}
              </Typography.Default>
              <View style={styles.commentGrade}>
                {Array.from(Array(5).keys()).map((item) => {
                  const isColored = item < comment.grade
                  return <Icon key={item} name={'star'} size={16} color={isColored ? 'orange' : Colors.grey} />
                })}
                <Typography.Subtitle mt={2} ml={5}>
                  {comment.date}
                </Typography.Subtitle>
              </View>
            </View>
          </View>
          {comment.comment ? (
            <Typography.Description mt={5}>{comment.comment}</Typography.Description>
          ) : (
            <View style={{ marginTop: 10 }}>
              <Button onPress={handleEditComment} buttonStyle={{ paddingVertical: 7, width: 290 }} icon='chatbubble'>
                Добавить Комментарий
              </Button>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.reviewHeader}>
          <Image style={styles.avatar} source={{ uri: avatar }} />
          <AirbnbRating
            onFinishRating={handleSetGrade}
            showRating={false}
            defaultRating={grade}
            size={35}
            selectedColor={'orange'}
          />
        </View>
      )}
    </View>
  )
}
