import { FormWrapper } from '@/components'
import { Colors } from '@/constants'
import { isErrorsExist } from '@/helpers'
import { Input } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { validationSchema } from './validation'

export const SignUpNamesForm = ({ onSubmit, initialValues, loading, error }: any) => {
  const navigation = useNavigation<any>()
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const { values, touched, errors, handleSubmit, handleChange, handleBlur, setFieldValue, resetForm } = formik

  useEffect(() => {
    return () => {
      resetForm()
    }
  }, [resetForm])

  const onChangeInput = (value: any, field: string) => {
    const valueWithoutSpaces = value.replace(/\s/g, '')
    setFieldValue(field, valueWithoutSpaces)
  }

  const isContinueButtonDisabled = isErrorsExist(errors)

  return (
    <FormWrapper
      title={'Регистрация'}
      loading={loading}
      onContinue={handleSubmit}
      disabledContinueBtn={isContinueButtonDisabled}
      error={error}
    >
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
        onChangeText={(value: any) => onChangeInput(value, 'password')}
        onBlur={handleBlur('password')}
        value={values.password}
        secureTextEntry
        showSecureEntryIcon
        errorMessage={errors.password}
        touched={touched.password}
      />
    </FormWrapper>
  )
}
