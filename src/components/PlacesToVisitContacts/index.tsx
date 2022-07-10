import { Colors } from '@/constants'
import { Divider, Typography } from '@/ui'
import React from 'react'
import { Linking, Platform, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from './styles'

type Props = {
  item: any
}

export const PlacesToVisitContacts = ({ item }: Props) => {
  const { phones, address, web, socials } = item
  // const { title, lat, lon } = address

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

  return (
    <>
      <Typography.H4 ml={20} mb={5}>
        Информация
      </Typography.H4>
      <View style={styles.container}>
        <View style={styles.infoItem}>
          <Icon name={'location'} size={23} color={Colors.iconGrey} />
          <View style={{ marginLeft: 15 }}>
            <Typography.Default type='semiBold'>Адрес</Typography.Default>
            <Typography.Description onPress={handleOpenMap} mt={10} color={Colors.primary}>
              {address.title}
            </Typography.Description>
          </View>
        </View>
        <Divider />
        <View style={styles.infoItem}>
          <Icon name={'call'} size={23} color={Colors.iconGrey} />
          <View style={{ marginLeft: 15 }}>
            <Typography.Default type='semiBold'>Телефон</Typography.Default>
            <Typography.Description onPress={handleOpenPhone} mt={10} color={Colors.primary}>
              {phones[0].number} <Typography.Subtitle>• {phones[0].title}</Typography.Subtitle>
            </Typography.Description>
          </View>
        </View>
        {item?.web ? (
          <>
            <Divider />

            <View style={styles.infoItem}>
              <Icon name={'globe-outline'} color={Colors.iconGrey} size={23} />
              <View style={{ marginLeft: 15 }}>
                <Typography.Default type='semiBold'>Сайт</Typography.Default>
                <Typography.Description onPress={handleOpenWeb} mt={10} color={Colors.primary}>
                  {web}
                </Typography.Description>
              </View>
            </View>
          </>
        ) : null}

        <View style={{ flexDirection: 'row' }}>
          {socials.map((item: any, i: number) => {
            const handleOpenSocial = () => Linking.openURL(item.url)

            return (
              <TouchableRipple borderless key={i} onPress={handleOpenSocial} style={styles.socialItem}>
                <MaterialIcon name={item.icon} size={25} color={Colors.white} />
              </TouchableRipple>
            )
          })}
        </View>
      </View>
    </>
  )
}
