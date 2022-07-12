import { Colors } from '@/constants'
import { BottomSheet, Spinner, Typography } from '@/ui'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useMemo, useState } from 'react'
import { Modal, StatusBar, View } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { Snackbar, TouchableRipple } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

export const PlacesToVisitPhotoScreen = () => {
  const route = useRoute<any>()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const { uris, index, title } = route.params
  const imageUrls = useMemo(() => uris.map((url: string) => ({ url })), [uris])

  const handleGoBack = () => navigation.goBack()
  const renderHeader = () => <View style={styles.header} />
  const renderIndicator = (currentIndex: any, allSize: any) => {
    return (
      <>
        <Typography.Default
          size={19}
          type='semiBold'
          style={[styles.backButton, { top: 20 + insets.top, left: 70 }]}
          color={Colors.white}
        >
          {currentIndex + ' / ' + allSize}
        </Typography.Default>
        <TouchableRipple
          onPress={() => handleOpenReportMenu(index)}
          style={[styles.rightButton, { top: 20 + insets.top }]}
        >
          <Icon name='flag-outline' color={Colors.white} size={20} />
        </TouchableRipple>
      </>
    )
  }

  const [reportIndex, setReportIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const reportImage = (report: string) => {
    setIsLoading(true)
    setError(null)

    const uid = auth().currentUser?.uid

    firestore()
      .collection('Reports')
      .doc('Images')
      .collection(title)
      .add({
        report,
        uid,
        user: 'Илья Павлющик',
        image_url: uris[reportIndex!],
      })
      .then(() => {
        setVisibleSnackBar(true)
        setIsReportMenuVisible(false)
        setIsLoading(false)
      })
      .catch(() => {
        setVisibleSnackBar(true)
        setError('Что-то пошло не так')
        setIsReportMenuVisible(false)
        setIsLoading(false)
      })
  }

  const [isReportMenuVisible, setIsReportMenuVisible] = useState(false)
  const menuData = [
    { title: 'Неприемлемое содержание', onPress: () => reportImage('Неприемлемое содержание') },
    { title: 'Неправильная организация', onPress: () => reportImage('Неправильная организация') },
  ]
  const handleOpenReportMenu = (index: number) => {
    setReportIndex(index)
    setIsReportMenuVisible(true)
  }

  const [visibleSnackBar, setVisibleSnackBar] = useState(false)
  const handleHideSnackBar = () => setVisibleSnackBar(false)

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.black} translucent={false} />
      <Modal statusBarTranslucent visible={isLoading}>
        <Spinner />
      </Modal>
      <TouchableRipple onPress={handleGoBack} style={[styles.backButton, { top: 16 + insets.top }]}>
        <Icon name='arrow-back' color={Colors.white} size={27} />
      </TouchableRipple>
      <ImageViewer
        imageUrls={imageUrls}
        index={index}
        enableSwipeDown
        onSwipeDown={handleGoBack}
        renderHeader={renderHeader}
        renderIndicator={renderIndicator}
      />
      <BottomSheet center data={menuData} onClose={setIsReportMenuVisible} isVisible={isReportMenuVisible} />
      <Snackbar
        visible={visibleSnackBar}
        onDismiss={handleHideSnackBar}
        style={{ zIndex: 1000 }}
        action={{
          label: 'Окей',
        }}
      >
        {error ?? 'Жалоба отправлена'}
      </Snackbar>
    </View>
  )
}
