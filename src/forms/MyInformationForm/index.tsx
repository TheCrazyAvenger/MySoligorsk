import { addresses, Colors, Fonts } from '@/constants'
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
        const { firstname, lastname, avatar, location, birthDate, address } = userInfo.data()
        await data.map((item: any) => {
          if (item.title === location.name) {
            setSelectedId(item.id)
          }
          return item
        })
        address &&
          (await addresses.map((item) => {
            if (item.title === address.street) {
              setStreetId(item.id)
              onSelectAddress(item)
              item.houses.map((house, i) => {
                if (house === address.house) {
                  setHouseId(i.toString())
                }
                return house
              })
            }
            return item
          }))
        setValues({
          firstname,
          lastname,
          avatar,
          location,
          birthDate,
          street: address ? address?.street : '',
          house: address ? address?.house : '',
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
      setFieldValue('location', { value: 'local', name: data[+id].title })
    } else {
      setFieldValue('location', { value: 'visitor', name: data[+id].title })
    }
  }

  const setBirthDate = (value: any) => {
    setFieldValue('birthDate', value.toDateString())
  }

  const [houses, setHouses] = useState<any>([])
  const [streetId, setStreetId] = useState<any>(null)
  const [houseId, setHouseId] = useState<any>(null)
  const onSelectAddress = async (item: any) => {
    if (item) {
      const addresses = await [...item.houses.map((item: string, i: number) => ({ id: i.toString(), title: item }))]
      setHouses(addresses)
      setFieldValue('street', item.title)
    }
  }
  const onAddressClear = () => {
    setFieldValue('street', '')
    setHouses([])
  }
  const onHouseClear = () => {
    setFieldValue('house', '')
  }

  const onSelectHouse = (item: any) => {
    if (item) {
      setFieldValue('house', item.title)
    }
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

  const isContinueButtonDisabled =
    isErrorsExist(errors) ||
    new Date('2010-01-01') <= new Date(values.birthDate) ||
    (values.street && !values.house) ||
    (!values.street && values.house)

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
        <Typography.Default mb={20}>Здесь вы можете изменить данные о себе</Typography.Default>

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
        <Typography.Default type='semiBold' mt={15}>
          Адрес
        </Typography.Default>
        <View>
          <View style={{ flexDirection: 'row', maxWidth: '79.5%' }}>
            <Input.Select
              dataSet={addresses}
              showChevron={false}
              placeholder='Улица'
              onSelectItem={onSelectAddress}
              onClear={onAddressClear}
              onBlur={handleBlur('street')}
              onChangeText={handleChange('street')}
              inputContainerStyle={{ minWidth: '95%', maxWidth: '95%' }}
              suggestionsListContainerStyle={{ width: '95%' }}
              value={values.street}
              initialValue={streetId ?? '0'}
              errorMessage={errors.street}
              touched={touched.street}
            />
            <Input.Select
              dataSet={houses}
              showChevron={false}
              placeholder='Дом'
              onSelectItem={onSelectHouse}
              onBlur={handleBlur('house')}
              onChangeText={handleChange('house')}
              onClear={onHouseClear}
              value={values.house}
              initialValue={houseId ?? '0'}
              inputContainerStyle={{ minWidth: '56%', maxWidth: '56%', paddingLeft: 0 }}
              suggestionsListContainerStyle={{ width: '56%' }}
              errorMessage={errors.house}
              inputStyle={{ marginLeft: 0 }}
              rightButtonsContainerStyle={{ marginRight: 0 }}
              touched={touched.house}
            />
          </View>
          <View
            style={[
              styles.errorsContainer,
              {
                bottom: errors?.street && touched.street && errors?.house && touched.house ? -38 : -20,
              },
            ]}
          >
            {errors?.street && touched.street ? (
              <Typography.Default style={[styles.error, { color: colors.error }]}>{errors.street}</Typography.Default>
            ) : null}
            {errors?.house && touched.house ? (
              <Typography.Default style={[styles.error, { color: colors.error }]}>{errors.house}</Typography.Default>
            ) : null}
          </View>
        </View>
        <View style={{ marginBottom: 60 }} />
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
