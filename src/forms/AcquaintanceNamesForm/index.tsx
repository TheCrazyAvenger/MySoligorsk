import { FormWrapper } from '@/components'
import { isErrorsExist } from '@/helpers'
import { Input } from '@/ui'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { validationSchema } from './validation'

export const AcquaintanceNamesForm = ({ onSubmit, initialValues }: any) => {
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
    <FormWrapper title={'Как вас зовут?'} onContinue={handleSubmit} disabledContinueBtn={isContinueButtonDisabled}>
      <Input.Default
        placeholder='Имя'
        onChangeText={handleChange('firstname')}
        onBlur={handleBlur('firstname')}
        value={values.firstname}
        errorMessage={errors.firstname}
        touched={touched.firstname}
      />
      <Input.Default
        placeholder='Фамилия'
        onChangeText={handleChange('lastname')}
        onBlur={handleBlur('lastname')}
        value={values.lastname}
        errorMessage={errors.lastname}
        touched={touched.lastname}
      />
    </FormWrapper>
  )
}
