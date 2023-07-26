import formStyles from './css/form.module.css';
import Container from '../components/container/container';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { postLoginUser } from '../services/actions/user';
import { IPostLoginUser } from '../utils/chema';
function Login() {
  // @ts-ignore
  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const initialValues: IPostLoginUser = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Введите корректный email')
      .required('Введите email'),
    password: Yup.string()
      .required('Введите пароль'),
  });

  const handleSubmit = (values: IPostLoginUser, formikHelpers: FormikHelpers<IPostLoginUser>) => {
    // @ts-ignore
    dispatch(postLoginUser(values));
    formikHelpers.resetForm();
  }

  return (
    <Container>
      <div className={formStyles.container}>
        <div className={formStyles.form__container}>
          <h1 className={`${formStyles.title} text text_type_main-medium`}>Вход</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ values, handleChange, errors, touched, isValid, dirty }) => (
              <Form className={`${formStyles.form} pt-6 pb-20`}>
                <EmailInput name={'email'} value={values.email} onChange={handleChange} extraClass="mt-6" />
                <PasswordInput name={'password'} extraClass="mt-6 mb-6" value={values.password} onChange={handleChange} />
                <Button
                  htmlType="submit"
                  type="primary"
                  extraClass={`${formStyles.button}`}
                  disabled={isLoading || !isValid || !dirty}
                  size="medium">
                  Войти
                </Button>
              </Form>
            )}
          </Formik>
          <p className={`text text_type_main-default text_color_inactive ${formStyles.text}`} >Вы — новый пользователь? <Link to="/register" className={formStyles.link}>Зарегистрироваться</Link></p>
          <p className={`text text_type_main-default text_color_inactive mt-4 ${formStyles.text}`} >Забыли пароль? <Link to="/forgot-password" className={formStyles.link}>Восстановить пароль</Link></p>
        </div>
      </div>
    </Container>
  );
}

export default Login;
