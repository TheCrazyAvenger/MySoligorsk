import * as Yup from 'yup'

export const validationSchema = Yup.object({
  street: Yup.string()
    .required('Введите название улицы')
    .max(50, 'Поле должно быть меньше или равно 50 символам')
    .matches(/^(?![ ]+$)[a-zA-Z \-а-яА-Я]*$/g, 'Можно использовать только символы латиницы и кириллицы'),
  house: Yup.string().required('Введите номер дома').max(4, 'Поле должно быть меньше или равно 4 символам'),
})
