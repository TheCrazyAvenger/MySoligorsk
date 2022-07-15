import { Colors } from '@/constants'
import { getWorkingHoursMessage } from '@/helpers'
import { BottomSheet, Divider, Typography } from '@/ui'
import React, { useMemo, useState } from 'react'
import { Linking, Platform, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from './styles'

type Props = {
  item: any
  workingHours: { close: string; day: string; id: number; open: string }[]
}

export const PlacesToVisitContacts = ({ item, workingHours }: Props) => {
  const { phones, address, web, socials } = item
  const { width } = useWindowDimensions()

  const handleOpenPhone = () => Linking.openURL(`tel:${'+375291913364'}`)
  const handleOpenMap = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
    const latLng = `${address.lat},${address.lon}`
    const label = address.title
    const url: any = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    })

    Linking.openURL(url)
  }
  const handleOpenWeb = () => {
    Linking.openURL(`https://${web}`)
  }

  const currentDay = new Date().getDay()
  const workingHoursData = useMemo(() => {
    const lastDay = {
      title: workingHours[0].day,
      description: `${workingHours[0].open} - ${workingHours[0].close}`,
      isSelected: currentDay === 0,
    }
    const otherDays = workingHours.map((item, i) => ({
      title: item.day,
      description: `${item.open} - ${item.close}`,
      isSelected: currentDay === i,
    }))

    return [...otherDays.filter((_, i) => i !== 0), lastDay]
  }, [workingHours])
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const handleOpenMenu = () => setIsMenuVisible(true)

  const workingHoursMessage = useMemo(() => getWorkingHoursMessage(workingHours), [workingHours])

  return (
    <>
      <Typography.H4 ml={20} mb={5}>
        Информация
      </Typography.H4>
      <View style={styles.container}>
        <View style={styles.infoItem}>
          <Icon name={'location'} size={23} color={Colors.grey} />
          <View style={{ marginLeft: 15 }}>
            <Typography.Default type='semiBold'>Адрес</Typography.Default>
            <TouchableOpacity activeOpacity={0.4} onPress={handleOpenMap}>
              <Typography.Description mt={10} color={Colors.primary}>
                {address.title}
              </Typography.Description>
            </TouchableOpacity>
          </View>
        </View>
        {item?.phones?.length ? (
          <>
            <Divider />
            <View style={styles.infoItem}>
              <Icon name={'call'} size={23} color={Colors.grey} />
              <View style={{ marginLeft: 15 }}>
                <Typography.Default type='semiBold'>Телефон</Typography.Default>
                <Typography.Description onPress={handleOpenPhone} mt={10} color={Colors.primary}>
                  {phones[0].number}{' '}
                  <Typography.Subtitle> {phones[0].title ? `• ${phones[0].title}` : ''}</Typography.Subtitle>
                </Typography.Description>
              </View>
            </View>
          </>
        ) : null}
        {item?.web ? (
          <>
            <Divider />
            <View style={styles.infoItem}>
              <Icon name={'globe-outline'} color={Colors.grey} size={23} />
              <View style={{ marginLeft: 15 }}>
                <Typography.Default type='semiBold'>Сайт</Typography.Default>
                <TouchableOpacity activeOpacity={0.4} onPress={handleOpenWeb}>
                  <Typography.Description mt={10} color={Colors.primary}>
                    {web}
                  </Typography.Description>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : null}

        <View style={{ flexDirection: 'row', marginLeft: 35 }}>
          {socials.map((item: any, i: number) => {
            const handleOpenSocial = () => Linking.openURL(item.url)

            return (
              <TouchableRipple borderless key={i} onPress={handleOpenSocial} style={styles.socialItem}>
                <MaterialIcon name={item.icon} size={25} color={Colors.white} />
              </TouchableRipple>
            )
          })}
        </View>

        <Divider />

        <View style={styles.infoItem}>
          <Icon name={'time-outline'} color={Colors.grey} size={23} />
          <View style={{ marginLeft: 15 }}>
            <Typography.Default type='semiBold'>Время работы</Typography.Default>
            <View style={[styles.timeInfo, { maxWidth: width - 40 }]}>
              <Typography.Description color={workingHoursMessage.color}>
                {workingHoursMessage.title}
              </Typography.Description>
              <TouchableOpacity activeOpacity={0.4} onPress={handleOpenMenu}>
                <Typography.Subtitle> • Подробнее</Typography.Subtitle>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <BottomSheet data={workingHoursData} onClose={setIsMenuVisible} isVisible={isMenuVisible} />
      </View>
    </>
  )
}
