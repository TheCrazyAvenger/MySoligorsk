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
import { Colors, Screens } from '@/constants'
import { getWorkingHoursMessage } from '@/helpers'
import { useGetComments, useGetImage, useGetImagesList } from '@/hooks'
import { Spinner, Typography } from '@/ui'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { TouchableRipple, useTheme } from 'react-native-paper'
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
  const { colors }: any = useTheme()

  const HEADER_MAX_HEIGHT = height * 0.6
  const HEADER_MIN_HEIGHT = height * 0.1

  const { title, category, content, location, workingHours, info, categories } = route.params.data
  const { lat, lon } = location

  const similarPlaces = route.params.places
    ?.filter((item: any) => item.categories?.includes(category) && item.title !== title)
    .slice(0, 5)

  const { uri, loading } = useGetImage({ placeName: title })
  const { uris, loading: imagesListLoading } = useGetImagesList({ placeName: title, size: 5 })

  const { comments, userComment, avarageRate, loading: commentsLoading } = useGetComments({ placeName: title, size: 5 })
  const handleGoToReview = (value: number) => {
    navigation.navigate(Screens.placesToVisitEditComments, { grade: value, title })
  }

  const handleGoBack = () => navigation.goBack()

  const workingHoursMessage = getWorkingHoursMessage(workingHours)

  const isLoading = loading || imagesListLoading

  return (
    <GestureHandlerRootView style={[StyleSheet.absoluteFillObject]}>
      {isLoading || commentsLoading ? (
        <Spinner />
      ) : (
        <>
          <Image
            style={[StyleSheet.absoluteFillObject, { height }]}
            resizeMode='cover'
            blurRadius={5}
            source={{ uri }}
          />

          <TouchableRipple onPress={handleGoBack} style={[styles.backButton, { top: 16 + insets.top }]}>
            <Icon name='arrow-back' color={Colors.white} size={27} />
          </TouchableRipple>

          <View style={[styles.header, { height: HEADER_MAX_HEIGHT }]}>
            <Typography.Default style={styles.title}>{title}</Typography.Default>
            <View style={styles.reviewSection}>
              <Typography.H3 color={Colors.white}>{category} • </Typography.H3>
              <View style={styles.reviewSection}>
                <Icon name='star' color={colors.orange} size={19} />
                <Typography.H3 ml={5} color={Colors.white}>
                  {avarageRate ? avarageRate.toFixed(1) : 'Нет отзывов'}
                </Typography.H3>
              </View>
            </View>
            <Typography.Subtitle
              mt={16}
              color={workingHoursMessage.color === colors.grass ? Colors.white : workingHoursMessage.color}
            >
              {workingHoursMessage.title}
            </Typography.Subtitle>
          </View>

          <BottomSheet
            // animateOnMount={false}
            backgroundStyle={{ backgroundColor: colors.background }}
            handleIndicatorStyle={{ backgroundColor: colors.text }}
            backdropComponent={(props) => <PlacesToVisitHeader title={title} {...props} />}
            index={0}
            snapPoints={[height - HEADER_MAX_HEIGHT + 50, height - HEADER_MIN_HEIGHT + 59]}
          >
            <BottomSheetScrollView>
              <View style={[styles.content, { backgroundColor: colors.background }]}>
                <PlacesToVisitPhotos uris={uris} title={title} />
                <View>
                  <PlacesToVisitContacts item={info} workingHours={workingHours} />
                  {content ? <PlacesToVisitContent content={content} /> : null}
                  <PlacesToVisitMap lat={lat} lon={lon} title={title} />
                  <PlacesToVisitYourComment
                    title={title}
                    handleSetGrade={handleGoToReview}
                    grade={0}
                    comment={userComment}
                  />
                  {comments?.length ? <PlacesToVisitComments title={title} data={comments} /> : null}
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
