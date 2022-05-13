import { Colors } from '@/constants'
import { Button, Input } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { validationSchema } from './validation'

export const SignUpNamesForm = ({ onSubmit, initialValues }: any) => {
  const navigation = useNavigation<any>()
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const { values, touched, errors, handleSubmit, handleChange, handleBlur, setFieldValue, setFieldTouched, resetForm } =
    formik

  useEffect(() => {
    return () => {
      resetForm()
    }
  }, [resetForm])

  return (
    <>
      <View>
        <Input.Default
          leftIcon={<Icon name='mail' size={25} color={Colors.primary} />}
          placeholder='Ваш email'
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          keyboardType='email-address'
          errorMessage={errors.email}
          touched={touched.email}
        />
        <Input.Default
          leftIcon={<Icon name='key' size={25} color={Colors.primary} />}
          placeholder='Ваш пароль'
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          secureTextEntry
          showSecureEntryIcon
          errorMessage={errors.password}
          touched={touched.password}
        />
      </View>
      <Button onPress={handleSubmit}>Далее</Button>
    </>
  )
}
