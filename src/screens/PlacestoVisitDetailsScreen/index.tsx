import {
  PlacesToVisitComments,
  PlacesToVisitContacts,
  PlacesToVisitContentItem,
  PlacesToVisitEditComments,
  PlacesToVisitHeader,
  PlacesToVisitMap,
  PlacesToVisitSimilarPlaces,
  PlacesToVisitYourComment,
} from '@/components'
import { Colors } from '@/constants'
import { Spinner, Typography } from '@/ui'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { FlatList } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { SharedElement } from 'react-navigation-shared-element'
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
  const { width, height } = useWindowDimensions()
  const bottomSheetRef = useRef<any>()
  const mainBottomSheetRef = useRef<any>()

  const [loading, setLoading] = useState(true)
  const [grade, setGrade] = useState(0)
  const [showBackButton, setShowBackButton] = useState(true)
  const handleSetGrade = (value: number) => {
    setGrade(value)
    mainBottomSheetRef.current.close()
    bottomSheetRef.current.expand()
    setShowBackButton(false)
  }

  const HEADER_MAX_HEIGHT = height * 0.6
  const HEADER_MIN_HEIGHT = height * 0.1

  useEffect(() => {
    setTimeout(() => setLoading(false), 400)
  }, [])

  const { image, title, id, category, content, location, comments, info } = route.params.data
  const { lat, lon } = location

  const similarPlaces = route.params.places
    ?.filter((item: any) => item.tags?.includes(category) && item.title !== title)
    .slice(0, 5)

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

  const keyExtractor = (item: any) => item.id
  const renderItem = ({ item, index }: any) => <PlacesToVisitContentItem key={index} item={item} index={index} />

  const avarageRate = useMemo(
    () => commentsArr.reduce((acc: number, next: any) => acc + next.grade, 0) / commentsArr.length,
    [commentsArr]
  )

  const handleSendComment = async (comment: Comment) => {
    await setCommentsArr((prev) => [comment, ...prev])
    await setUserComment(comment)
    mainBottomSheetRef.current.expand()
    bottomSheetRef.current.close()
    setShowBackButton(true)
    setGrade(0)
  }
  const handleCloseComment = () => {
    mainBottomSheetRef.current.expand()
    bottomSheetRef.current.close()
    setShowBackButton(true)
    setGrade(0)
  }

  return (
    <View style={[StyleSheet.absoluteFillObject]}>
      <SharedElement id={`item.${id}.photo`} style={[styles.image]}>
        <Image style={[StyleSheet.absoluteFillObject, { height }]} resizeMode='cover' blurRadius={5} source={image} />
      </SharedElement>
      {showBackButton && (
        <TouchableOpacity onPress={handleGoBack} style={[styles.backButton, { top: 16 + insets.top }]}>
          <Icon name='arrow-back' color={Colors.white} size={27} />
        </TouchableOpacity>
      )}

      <View style={[styles.header, { height: HEADER_MAX_HEIGHT }]}>
        <SharedElement id={`item.${id}.title`}>
          <Animated.Text style={styles.title}>{title}</Animated.Text>
        </SharedElement>
        <SharedElement id={`item.${id}.subTitle`}>
          <Text style={styles.subTitle}>{category}</Text>
        </SharedElement>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
          <Icon name={'star'} color={'orange'} size={21} />
          <Typography.H3 ml={5} color={Colors.white}>
            {avarageRate ? avarageRate.toFixed(1) : '0.0'}
          </Typography.H3>
        </View>
      </View>

      <BottomSheet
        animateOnMount={false}
        ref={mainBottomSheetRef}
        backdropComponent={(props) => <PlacesToVisitHeader title={title} {...props} />}
        index={0}
        snapPoints={[height - HEADER_MAX_HEIGHT + 50, height - HEADER_MIN_HEIGHT + 50]}
      >
        <BottomSheetScrollView>
          <View style={styles.content}>
            {loading ? (
              <Spinner style={{ position: 'relative', height: height - HEADER_MAX_HEIGHT / 1.1, width: '100%' }} />
            ) : (
              <Animatable.View animation={'fadeInUp'}>
                {content ? (
                  <View style={{ marginBottom: 20 }}>
                    <Typography.ContentTitle ml={20}>{content.title}</Typography.ContentTitle>
                    <FlatList
                      data={content.items}
                      keyExtractor={keyExtractor}
                      renderItem={renderItem}
                      contentContainerStyle={{ paddingLeft: 20 }}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                ) : null}
                <PlacesToVisitContacts item={info} />
                <PlacesToVisitMap lat={lat} lon={lon} title={title} />
                {similarPlaces?.length > 0 && (
                  <PlacesToVisitSimilarPlaces data={similarPlaces} places={route.params.places} />
                )}
                <PlacesToVisitYourComment handleSetGrade={handleSetGrade} grade={grade} comment={userComment} />
                <PlacesToVisitComments data={commentsArr} />
              </Animatable.View>
            )}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>

      <BottomSheet
        index={0}
        enablePanDownToClose
        enableContentPanningGesture={false}
        ref={bottomSheetRef}
        snapPoints={[0.01, height]}
      >
        <BottomSheetScrollView>
          <PlacesToVisitEditComments grade={grade} sendComment={handleSendComment} handleClose={handleCloseComment} />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  )
}
