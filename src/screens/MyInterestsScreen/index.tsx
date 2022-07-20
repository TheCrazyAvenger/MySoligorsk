import { MyInterestsItem } from '@/components'
import { selectUser } from '@/selectors'
import { Button, Typography } from '@/ui'
import React from 'react'
import { ScrollView } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { styles } from './styles'

export const MyInterestsScreen = () => {
  const { interests } = useSelector(selectUser)
  const { colors } = useTheme()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ marginTop: 20, paddingHorizontal: 20 }}
    >
      <Typography.Default>
        Здесь находятся ваши увлечения, выбранные при регистрации. Вы можете добавить новые, или скрыть то, что вам
        неинтересно
      </Typography.Default>
      <MyInterestsItem data={interests} title={'Выбранные'} />
      <Button buttonStyle={styles.button} icon='add-circle'>
        Добавить
      </Button>
    </ScrollView>
  )
}
