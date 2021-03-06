import * as Yup from 'yup'

export const validationSchema = Yup.object({
  firstname: Yup.string()
    .required('Введите свое Имя')
    .max(50, 'Поле должно быть меньше или равно 50 символам')
    .matches(/^(?![ ]+$)[a-zA-Z \-а-яА-Я]*$/g, 'Можно использовать только символы латиницы и кириллицы'),
  lastname: Yup.string()
    .required('Введите свою Фамилию')
    .max(50, 'Поле должно быть меньше или равно 50 символам')
    .matches(/^(?![ ]+$)[a-zA-Z \-а-яА-Я]*$/g, 'Можно использовать только символы латиницы и кириллицы'),
})
