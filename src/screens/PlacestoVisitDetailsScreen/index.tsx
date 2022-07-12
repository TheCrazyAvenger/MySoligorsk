import {
  PlacesToVisitComments,
  PlacesToVisitContacts,
  PlacesToVisitContent,
  PlacesToVisitHeader,
  PlacesToVisitMap,
  PlacesToVisitPhotos,
  PlacesToVisitSimilarPlaces,
  PlacesToVisitYourComment,
} from '@/components'
import { Colors } from '@/constants'
import { useGetImage, useGetImagesList } from '@/hooks'
import { Spinner, Typography } from '@/ui'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useMemo, useState } from 'react'
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Snackbar, TouchableRipple } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

interface Comment {
  user: string
  grade: number
  comment: string
  date: string
}

export const PlacestoVisitDetailsScreen = () => {
  const route = useRoute<any>()
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const { height } = useWindowDimensions()

  const [grade, setGrade] = useState(0)
  const [showBackButton, setShowBackButton] = useState(true)
  const handleSetGrade = (value: number) => {}

  const HEADER_MAX_HEIGHT = height * 0.6
  const HEADER_MIN_HEIGHT = height * 0.1

  const { title, category, content, location, comments, workingHours, info, categories } = route.params.data
  const { lat, lon } = location

  const similarPlaces = route.params.places
    ?.filter((item: any) => item.categories?.includes(category) && item.title !== title)
    .slice(0, 5)

  const { uri, loading } = useGetImage({ placeName: title })
  const { uris, loading: imagesListLoading } = useGetImagesList({ placeName: title, size: 5 })

  const [commentsArr, setCommentsArr] = useState<Comment[]>(comments)
  const [userComment, setUserComment] = useState<Comment | null>(null)

  useEffect(() => {
    setCommentsArr(
      comments.filter((item: any) => {
        if (item.user === 'Илья Павлющик') {
          setUserComment(item)
          return false
        } else {
          return true
        }
      })
    )
  }, [comments])

  const handleGoBack = () => navigation.goBack()

  const avarageRate = useMemo(
    () => commentsArr.reduce((acc: number, next: any) => acc + next.grade, 0) / commentsArr.length,
    [commentsArr]
  )

  const handleSendComment = async (comment: Comment) => {
    await setCommentsArr((prev) => [comment, ...prev])
    await setUserComment(comment)
  }

  const [visibleSnackBar, setVisibleSnackBar] = React.useState(false)
  const handleHideSnackBar = () => setVisibleSnackBar(false)

  const isLoading = loading || imagesListLoading

  return (
    <GestureHandlerRootView style={[StyleSheet.absoluteFillObject]}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Snackbar
            visible={visibleSnackBar}
            onDismiss={handleHideSnackBar}
            style={{ zIndex: 1000 }}
            action={{
              label: 'Окей',
            }}
          >
            Фотографии успешно загружены
          </Snackbar>

          <Image
            style={[StyleSheet.absoluteFillObject, { height }]}
            resizeMode='cover'
            blurRadius={5}
            source={{ uri }}
          />
          {showBackButton && (
            <TouchableRipple onPress={handleGoBack} style={[styles.backButton, { top: 16 + insets.top }]}>
              <Icon name='arrow-back' color={Colors.white} size={27} />
            </TouchableRipple>
          )}

          <View style={[styles.header, { height: HEADER_MAX_HEIGHT }]}>
            <Typography.Default style={styles.title}>{title}</Typography.Default>
            <View style={styles.reviewSection}>
              <Typography.H3 color={Colors.white}>{category} • </Typography.H3>
              <View style={styles.reviewSection}>
                <Icon name='star' color={Colors.orange} size={19} />
                <Typography.H3 ml={5} color={Colors.white}>
                  {avarageRate ? avarageRate.toFixed(1) : 'Нет отзывов'}
                </Typography.H3>
              </View>
            </View>
          </View>

          <BottomSheet
            // animateOnMount={false}

            backdropComponent={(props) => <PlacesToVisitHeader title={title} {...props} />}
            index={0}
            snapPoints={[height - HEADER_MAX_HEIGHT + 50, height - HEADER_MIN_HEIGHT + 50]}
          >
            <BottomSheetScrollView>
              <View style={styles.content}>
                <PlacesToVisitPhotos uris={uris} title={title} showSnackbar={setVisibleSnackBar} />
                <View>
                  <PlacesToVisitContacts item={info} workingHours={workingHours} />
                  {content ? <PlacesToVisitContent content={content} /> : null}
                  <PlacesToVisitMap lat={lat} lon={lon} title={title} />
                  <PlacesToVisitYourComment handleSetGrade={handleSetGrade} grade={grade} comment={userComment} />
                  {commentsArr?.length ? <PlacesToVisitComments data={commentsArr} /> : null}
                  {similarPlaces?.length > 0 && (
                    <PlacesToVisitSimilarPlaces data={similarPlaces} places={route.params.places} />
                  )}
                </View>
              </View>
            </BottomSheetScrollView>
          </BottomSheet>
        </>
      )}
    </GestureHandlerRootView>
  )
}
