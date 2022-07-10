import { Colors, Screens } from '@/constants'
import { useSendImage } from '@/hooks'
import { selectToken } from '@/selectors'
import { BottomSheet, Button, Spinner, Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, Modal, StyleSheet, useWindowDimensions, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import { styles } from './styles'

type Props = {
  uris: string[]
  title: string
  showSnackbar: (condition: boolean) => any
}

export const PlacesToVisitPhotos = ({ uris, title, showSnackbar }: Props) => {
  const navigation = useNavigation<any>()
  const { width } = useWindowDimensions()
  const token = useSelector(selectToken)
  const { loading, sendPhoto } = useSendImage({ placeName: title, token })
  const handleMakePhoto = () => {
    launchCamera({ mediaType: 'photo', quality: 0.5 }, (result) => {
      result?.assets &&
        sendPhoto({
          result,
          callback: () => {
            showSnackbar(true)
            setIsMenuVisible(false)
          },
        })
    })
  }

  const handlePickPhotoFromGalery = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 4, quality: 0.5 }, (result) => {
      result?.assets &&
        sendPhoto({
          result,
          callback: () => {
            showSnackbar(true)
            setIsMenuVisible(false)
          },
        })
    })
  }

  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const menuData = [
    { title: 'Сделать фото', icon: 'camera', onPress: handleMakePhoto },
    { title: 'Выбрать из галереи (макс. 5)', icon: 'images', onPress: handlePickPhotoFromGalery },
  ]
  const handleOpenMenu = () => setIsMenuVisible(true)

  const handleGoToPhotos = () => navigation.navigate(Screens.placesToVisitPhotos, { title })

  const keyExtractor = (item: any) => item
  const renderItem = ({ item, index }: any) => {
    const isLast = index === uris.length - 1
    const handleGoToPhoto = () => navigation.navigate(Screens.placesToVisitPhoto, { uri: item })

    return (
      <View key={index} style={[isLast && { flexDirection: 'row' }]}>
        <TouchableRipple borderless onPress={handleGoToPhoto} style={[styles.imageContainer, { width: width * 0.7 }]}>
          <Image style={[StyleSheet.absoluteFillObject]} borderRadius={20} resizeMode='cover' source={{ uri: item }} />
        </TouchableRipple>
        {isLast && (
          <TouchableRipple borderless onPress={handleGoToPhotos} style={[styles.seeAllContainer]}>
            <View style={styles.seeAll}>
              <Icon name={'images-outline'} size={55} color={Colors.white} />
              <Typography.Subtitle mt={5} color={Colors.white}>
                Все фото
              </Typography.Subtitle>
            </View>
          </TouchableRipple>
        )}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Modal statusBarTranslucent visible={loading}>
        <Spinner />
      </Modal>

      <Typography.H4 mb={10} ml={20}>
        Фото
      </Typography.H4>
      <FlatList
        data={uris}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <Button icon={'camera'} buttonStyle={{ marginHorizontal: 20 }} onPress={handleOpenMenu}>
        Добавить фото
      </Button>
      <BottomSheet data={menuData} onClose={setIsMenuVisible} isVisible={isMenuVisible} />
    </View>
  )
}
