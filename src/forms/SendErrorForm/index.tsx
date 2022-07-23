import { FormImagePicker } from '@/components'
import { isErrorsExist } from '@/helpers'
import { Button, Input, Spinner, Typography } from '@/ui'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { styles } from './styles'
import { validationSchema } from './validation'

export const SendErrorForm = ({ onSubmit, initialValues, uris, addImageHandler, removeImageHandler, loading }: any) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const { values, touched, errors, handleSubmit, handleChange, handleBlur, setFieldValue, resetForm } = formik

  const { colors } = useTheme()

  useEffect(() => {
    return () => {
      resetForm()
    }
  }, [resetForm])

  const isContinueButtonDisabled = isErrorsExist(errors)

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {loading && <Spinner />}
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={{ marginTop: 20, paddingHorizontal: 20 }}
      >
        <Typography.Default mb={30}>
          Если вы ищете ответы, хотите решить проблему или просто хотите сообщить нам, как у нас дела, мы будем рады
          услышать от вас. Заполните форму ниже, и наши модераторы свяжутся с вами в ближайшее время.
        </Typography.Default>
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
        <Input.Default
          label={'Почта'}
          placeholder='Почта'
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          errorMessage={errors.email}
          touched={touched.email}
        />
        <View style={styles.commentHeader}>
          <Typography.Default type='semiBold'>Комментарий</Typography.Default>
          <Typography.Description ml={5} lineH={22}>
            {values.message.length}/250
          </Typography.Description>
        </View>
        <Input.Default
          value={values.message}
          onChangeText={handleChange('message')}
          onBlur={handleBlur('message')}
          multiline
          placeholder='Опишите проблему'
          maxLength={250}
          errorMessage={errors.message}
          touched={touched.message}
        />
        <FormImagePicker
          style={{ marginLeft: -20, marginTop: 7, marginBottom: 20 }}
          label='Прикрепите фото для дополнительной информации'
          uris={uris}
          title={''}
          addHandler={addImageHandler}
          removeHandler={removeImageHandler}
        />
      </ScrollView>
      <View style={[styles.buttons, { backgroundColor: colors.background }]}>
        <Button
          loading={loading}
          onPress={handleSubmit}
          disabled={isContinueButtonDisabled}
          buttonStyle={{ marginBottom: 20 }}
        >
          Отправить
        </Button>
      </View>
    </View>
  )
}
