import { Colors, Fonts } from '@/constants'
import { isErrorsExist } from '@/helpers'
import { selectToken } from '@/selectors'
import { BottomSheet, Button, Input, Spinner, Typography } from '@/ui'
import firestore from '@react-native-firebase/firestore'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import BouncyCheckboxGroup, { ICheckboxButton } from 'react-native-bouncy-checkbox-group'
import DatePicker from 'react-native-date-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { TouchableRipple, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import { styles } from './styles'
import { validationSchema } from './validation'

const renderText = (text: string) => {
  return <Typography.Label style={{ fontFamily: Fonts.openSansRegular }}>{text}</Typography.Label>
}

export const MyInformationForm = ({ onSubmit, initialValues, loading }: any) => {
  const token = useSelector(selectToken)
  const { colors } = useTheme()

  const [selectedId, setSelectedId] = useState(null)
  const data: any = [
    {
      id: 0,
      fillColor: '#629FFA',
      text: renderText('Я здесь живу'),
      title: 'Я здесь живу',
      textStyle: { textDecorationLine: 'none', color: colors.text },
      style: { marginBottom: 15, marginRight: 40 },
    },
    {
      id: 1,
      fillColor: '#629FFA',
      text: renderText('Я здесь живу, но учусь/работаю в другом городе'),
      title: 'Я здесь живу, но учусь/работаю в другом городе',
      textStyle: { textDecorationLine: 'none', color: colors.text },
      style: { marginBottom: 15, marginRight: 40 },
    },
    {
      id: 2,
      fillColor: '#629FFA',
      text: renderText('Я здесь учусь, но живу/работаю в другом городе'),
      title: 'Я здесь учусь, но живу/работаю в другом городе',
      textStyle: { textDecorationLine: 'none', color: colors.text },
      style: { marginBottom: 15, marginRight: 40 },
    },
    {
      id: 3,
      fillColor: '#629FFA',
      text: renderText('Я турист'),
      title: 'Я турист',
      textStyle: { textDecorationLine: 'none', color: colors.text },
      style: { marginBottom: 15, marginRight: 40 },
    },
  ]

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const { values, touched, errors, handleSubmit, handleChange, handleBlur, setValues, setFieldValue, resetForm } =
    formik

  const [userInfoLoading, setUserInfoLoading] = useState(true)
  const getUserInfo = async () => {
    setUserInfoLoading(true)
    await firestore()
      .collection('Users')
      .doc(token)
      .get()
      .then(async (userInfo: any) => {
        const { firstname, lastname, avatar, location, birthDate } = userInfo.data()
        await data.map((item: any) => {
          if (item.title === location.name) {
            setSelectedId(item.id)
          }
          return item
        })
        setValues({
          firstname,
          lastname,
          avatar,
          location,
          birthDate,
        })
        setUserInfoLoading(false)
      })
      .catch(() => {
        setUserInfoLoading(false)
      })
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  const handleSetAbout = (id: string) => {
    if (id === '0' || id === '1') {
      setFieldValue('location', { name: 'local', value: data[+id].title })
    } else {
      setFieldValue('location', { name: 'visitor', value: data[+id].title })
    }
  }

  const setBirthDate = (value: any) => {
    setFieldValue('birthDate', value.toDateString())
  }

  const handleMakePhoto = () => {
    launchCamera({ mediaType: 'photo', quality: 0.5 }).then((image) => {
      image?.assets && setFieldValue('avatar', image.assets?.[0].uri)
      handleCloseMenu()
    })
  }

  const handlePickPhotoFromGalery = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 1, quality: 0.5 }).then((image) => {
      image?.assets && setFieldValue('avatar', image.assets?.[0].uri)
      handleCloseMenu()
    })
  }

  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const menuData = [
    { title: 'Сделать фото', icon: 'camera', onPress: handleMakePhoto },
    { title: 'Выбрать из галереи', icon: 'images', onPress: handlePickPhotoFromGalery },
  ]
  const handleOpenMenu = () => setIsMenuVisible(true)
  const handleCloseMenu = () => setIsMenuVisible(false)

  useEffect(() => {
    return () => {
      resetForm()
    }
  }, [resetForm])

  const isContinueButtonDisabled = isErrorsExist(errors)

  return userInfoLoading ? (
    <Spinner />
  ) : (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {loading && <Spinner />}
      <BottomSheet data={menuData} onClose={setIsMenuVisible} isVisible={isMenuVisible} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={{ marginTop: 20, paddingHorizontal: 20 }}
      >
        <Typography.Default mb={30}>Здесь вы можете изменить данные о себе</Typography.Default>

        <Typography.Default type='semiBold' mb={5}>
          Фото
        </Typography.Default>
        <TouchableRipple borderless style={styles.imageContainer} onPress={handleOpenMenu}>
          <View style={[StyleSheet.absoluteFillObject, styles.inner]}>
            {values.avatar ? (
              <Image source={{ uri: values.avatar }} style={styles.image} />
            ) : (
              <Icon name={'camera'} color={Colors.white} size={60} />
            )}
          </View>
        </TouchableRipple>

        <Input.Default
          label={'Имя'}
          placeholder='Имя'
          onChangeText={handleChange('firstname')}
          onBlur={handleBlur('firstname')}
          value={values.firstname}
          errorMessage={errors.firstname}
          touched={touched.firstname}
        />
        <Input.Default
          label={'Фамилия'}
          placeholder='Фамилия'
          onChangeText={handleChange('lastname')}
          onBlur={handleBlur('lastname')}
          value={values.lastname}
          errorMessage={errors.lastname}
          touched={touched.lastname}
        />
        <Typography.Default type='semiBold' mb={10}>
          Информация о себе
        </Typography.Default>
        <BouncyCheckboxGroup
          data={data}
          style={{ flexDirection: 'column' }}
          onChange={(selectedItem: ICheckboxButton) => {
            const index = JSON.stringify(selectedItem.id)
            handleSetAbout(index)
          }}
          initial={selectedId!}
        />
        <Typography.Default type='semiBold' mv={10}>
          Дата рождения
        </Typography.Default>
        <DatePicker
          date={new Date(values.birthDate)}
          style={{ alignSelf: 'center' }}
          maximumDate={new Date()}
          minimumDate={new Date('1920-01-01')}
          onDateChange={setBirthDate}
          textColor={colors.text}
          fadeToColor={colors.background}
          mode='date'
        />
      </ScrollView>
      <View style={[styles.buttons, { backgroundColor: colors.background }]}>
        <Button
          loading={loading}
          onPress={handleSubmit}
          disabled={isContinueButtonDisabled}
          buttonStyle={{ marginBottom: 20 }}
        >
          Изменить
        </Button>
      </View>
    </View>
  )
}
