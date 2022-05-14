import * as Yup from 'yup'

export const validationSchema = Yup.object({
  email: Yup.string()
    .required('Введите свой Email')
    .email('Проверьте формат электронной почты')
    .max(64, 'Это поле должно быть меньше или равно 64 символам.'),
  password: Yup.string()
    .required('Введите пароль')
    .min(8, 'Пароль должен быть не менее 8 символов')
    .max(32, 'Пароль должен быть не более 32 символов'),
})
