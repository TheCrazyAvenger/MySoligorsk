import { Screens } from '@/constants'
import { useGetImagesList, useSendImage } from '@/hooks'
import { selectToken } from '@/selectors'
import { BottomSheet, Button, Spinner } from '@/ui'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, Modal, ScrollView, StyleSheet, View } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { Snackbar, TouchableRipple } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { styles } from './styles'

export const PlacesToVisitPhotosScreen = () => {
  const route = useRoute<any>()
  const navigation = useNavigation<any>()

  const { title } = route.params

  const { uris, loading } = useGetImagesList({ placeName: title, size: 100 })

  const token = useSelector(selectToken)
  const { loading: loadingPhoto, sendPhoto } = useSendImage({ placeName: title, token })

  const [visibleSnackBar, setVisibleSnackBar] = React.useState(false)
  const handleHideSnackBar = () => setVisibleSnackBar(false)
  const handleShowSnackBar = () => setVisibleSnackBar(true)
  const handleMakePhoto = () => {
    launchCamera({ mediaType: 'photo', quality: 0.5 }, (result) => {
      result?.assets &&
        sendPhoto({
          result,
          callback: () => {
            handleShowSnackBar()
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
            handleShowSnackBar()
            setIsMenuVisible(false)
          },
        })
    })
  }
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const menuData = [
    { title: 'Сделать фото', icon: 'camera', onPress: handleMakePhoto },
    { title: 'Выбрать из галереи (макс. 6)', icon: 'images', onPress: handlePickPhotoFromGalery },
  ]
  const handleOpenMenu = () => setIsMenuVisible(true)

  return (
    <View style={styles.container}>
      <Snackbar
        visible={visibleSnackBar}
        onDismiss={handleHideSnackBar}
        style={{ zIndex: 1000 }}
        action={{
          label: 'Окей',
        }}
      >
        Фотографии загружены
      </Snackbar>
      <BottomSheet data={menuData} onClose={setIsMenuVisible} isVisible={isMenuVisible} />
      <Modal statusBarTranslucent visible={loadingPhoto}>
        <Spinner />
      </Modal>

      {loading || !uris ? (
        <Spinner />
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {uris.map((item: any, index: number) => {
            const handleGoToPhoto = () => navigation.navigate(Screens.placesToVisitPhoto, { uris, index, title })

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
        buttonStyle={{ marginHorizontal: 20, marginVertical: 10, width: 200, paddingVertical: 7 }}
        onPress={handleOpenMenu}
      >
        Добавить фото
      </Button>
    </View>
  )
}
