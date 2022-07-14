import { Screens } from '@/constants'
import { useGetImagesList, useSendImage } from '@/hooks'
import { selectToken } from '@/selectors'
import { BottomSheet, Button, Spinner } from '@/ui'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, Modal, ScrollView, StyleSheet, View } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { TouchableRipple } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { styles } from './styles'

export const PlacesToVisitPhotosScreen = () => {
  const route = useRoute<any>()
  const navigation = useNavigation<any>()

  const { title } = route.params

  const { uris, loading } = useGetImagesList({ placeName: title, size: 100 })

  const token = useSelector(selectToken)
  const { loading: loadingPhoto, sendPhoto, error, cleanError } = useSendImage({ placeName: title, token })

  const handleMakePhoto = () => {
    launchCamera({ mediaType: 'photo', quality: 0.5 }, (result) => {
      result?.assets &&
        sendPhoto({
          result,
          callback: () => {
            setIsMenuVisible(false)
            handleComplete()
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
            setIsMenuVisible(false)
            handleComplete()
          },
        })
    })
  }

  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const menuData = [
    { title: 'Сделать фото', icon: 'camera', onPress: handleMakePhoto },
    { title: 'Выбрать из галереи (макс. 6)', icon: 'images', onPress: handlePickPhotoFromGalery },
  ]
  const handleOpenMenu = () => {
    cleanError()
    setIsMenuVisible(true)
  }

  const handleComplete = () =>
    navigation.navigate(Screens.completeScreen, {
      title: 'Фотография(-и) отправлена(-ы)',
      description: 'Спасибо, что помогаете другим пользователям',
    })

  return (
    <View style={styles.container}>
      <BottomSheet
        error={error}
        hideError={cleanError}
        data={menuData}
        onClose={setIsMenuVisible}
        isVisible={isMenuVisible}
      />
      <Modal statusBarTranslucent visible={loadingPhoto}>
        <Spinner />
      </Modal>

      {loading || !uris ? (
        <Spinner />
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {uris.map((item: any, index: number) => {
            const handleGoToPhoto = () =>
              navigation.navigate(Screens.placesToVisitPhoto, { uris, index, title, showReport: true })

            return (
              <TouchableRipple
                borderless
                onPress={handleGoToPhoto}
                key={item}
                style={[styles.imageContainer, { width: '49%' }]}
              >
                <Image
                  style={[StyleSheet.absoluteFillObject]}
                  borderRadius={0}
                  resizeMode='cover'
                  source={{ uri: item }}
                />
              </TouchableRipple>
            )
          })}
        </ScrollView>
      )}
      <Button
        icon={'camera'}
        buttonStyle={styles.button}
        onPress={handleOpenMenu}
      >
        Добавить фото
      </Button>
    </View>
  )
}
