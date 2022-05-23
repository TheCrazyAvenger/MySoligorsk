import { FormWrapper } from '@/components'
import { isErrorsExist } from '@/helpers'
import { Input } from '@/ui'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { validationSchema } from './validation'

export const AcquaintanceAddressForm = ({ onSubmit, handleSkip, initialValues }: any) => {
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

  const isContinueButtonDisabled = isErrorsExist(errors)

  return (
    <FormWrapper
      title={'Укажите ваш адрес'}
      description={
        'Это необязательно, но, с этой информацией мы сможем подбирать для вас подходящие места рядом, связанные с вашими увлечениями. Также вы сможете видеть находящиеся рядом с вами открытые заведения (магазины и т.д)'
      }
      onContinue={handleSubmit}
      disabledContinueBtn={isContinueButtonDisabled}
      secondButtonTitle={'Пропустить'}
      onSecondContinue={handleSkip}
    >
      <View style={{ flexDirection: 'row', maxWidth: '79.5%' }}>
        <Input.Default
          placeholder='Улица'
          onChangeText={handleChange('street')}
          onBlur={handleBlur('street')}
          inputContainerStyle={{ width: '96%' }}
          value={values.street}
          errorMessage={errors.street}
          touched={touched.street}
        />
        <Input.Default
          placeholder='Дом'
          onChangeText={handleChange('house')}
          onBlur={handleBlur('house')}
          value={values.house}
          inputContainerStyle={{ width: '26%' }}
          errorMessage={errors.house}
          touched={touched.house}
        />
      </View>
    </FormWrapper>
  )
}
