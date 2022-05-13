import * as Yup from 'yup'

export const validationSchema = Yup.object({
  email: Yup.string()
    .required('Please enter your email')
    .email('Please check your email format')
    .max(64, 'This field should be less than or equal to 64 symbols'),
  password: Yup.string().required('Please enter your password').min(8).max(32),
})
