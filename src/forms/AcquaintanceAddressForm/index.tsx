import { FormWrapper, UnknownAddressModal } from '@/components'
import { addresses } from '@/constants'
import { isErrorsExist } from '@/helpers'
import { Input, Typography } from '@/ui'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { styles } from './styles'
import { validationSchema } from './validation'

export const AcquaintanceAddressForm = ({
  onSubmit,
  handleSkip,
  initialValues,
  handleCloseModal,
  unknownAddressModal,
}: any) => {
  const { colors } = useTheme()
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

  const [houses, setHouses] = useState<any>([])

  const isContinueButtonDisabled = isErrorsExist(errors)

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

  return (
    <>
      <UnknownAddressModal
        visible={unknownAddressModal}
        street={values.street}
        house={values.house}
        hideModal={handleCloseModal}
      />
      <FormWrapper
        title={'Укажите ваш адрес'}
        description={
          'Это необязательно, но с этой информацией мы сможем подбирать для вас подходящие места рядом, связанные с вашими увлечениями. Также вы сможете видеть находящиеся рядом с вами открытые заведения (магазины и т.д)'
        }
        onContinue={handleSubmit}
        disabledContinueBtn={isContinueButtonDisabled}
        secondButtonTitle={'Пропустить'}
        onSecondContinue={handleSkip}
      >
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
      </FormWrapper>
    </>
  )
}
