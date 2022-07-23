import { Colors, Fonts, interests } from '@/constants'
import { Divider, Typography } from '@/ui'
import React, { useMemo } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { TouchableRipple, useTheme } from 'react-native-paper'
import { default as IonIcon } from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from './styles'

type Props = {
  title: string
  data: string[]
  onRemove: (interest: string) => void
  loading: boolean
}

const getIcon = (name: string, type: string, color: string = Colors.white) => {
  return type === 'Ion' ? (
    <IonIcon color={color} name={name} size={20} />
  ) : (
    <MaterialIcon color={color} name={name} size={20} />
  )
}

export const MyInterestsItem = ({ data, title, onRemove, loading }: Props) => {
  const { colors }: any = useTheme()

  const interestsArr = useMemo(() => {
    return data.map((item) => interests.filter((interest) => interest.title === item))
  }, [data])

  return (
    <>
      <Typography.Default mt={20} mb={5} ml={10} type='semiBold' color={Colors.grey}>
        {title}
      </Typography.Default>
      <View style={[styles.container, { backgroundColor: colors.navigation }]}>
        {interestsArr.map((item, i) =>
          item.map((item) => {
            return (
              <View key={i}>
                {i !== 0 && <Divider style={styles.divider} />}
                <View style={styles.menuItemWrapper}>
                  <View style={styles.menuItemInner}>
                    <View style={styles.menuItemContent}>
                      <View style={[styles.iconContainer, { backgroundColor: item.fillColor }]}>
                        {getIcon(item.icon, item.iconType)}
                      </View>
                      <Typography.H4 ml={8} style={{ fontFamily: Fonts.openSansRegular }}>
                        {item.title}
                      </Typography.H4>
                    </View>

                    <TouchableRipple borderless style={styles.trashContainer} onPress={() => onRemove(item.title)}>
                      {loading ? <ActivityIndicator /> : <IonIcon name='trash' size={20} color={colors.error} />}
                    </TouchableRipple>
                  </View>
                </View>
              </View>
            )
          })
        )}
      </View>
    </>
  )
}
