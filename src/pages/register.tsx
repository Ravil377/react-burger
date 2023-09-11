import formStyles from './css/form.module.css';
import Container from '../components/container/container';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { postRegisterUser } from '../services/actions/user';
import { IUserProps, useAppDispatch, useAppSelector } from '../utils/chema';

function Register() {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(state => state.user);

    const initialValues = {
        email: '',
        name: '',
        password: ''
    };
   
    const handleSubmit = (values: IUserProps, formikHelpers: FormikHelpers<IUserProps>) => {
        dispatch(postRegisterUser(values));
        formikHelpers.resetForm();
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Введите корректный email')
            .required('Введите email'),
        name: Yup.string()
            .required('Введите имя'),
        password: Yup.string()
            .required('Введите пароль'),
    });

    return (
        <Container >
            <div className={formStyles.container}>
                <div className={formStyles.form__container}>
                    <h1 className={`${formStyles.title} text text_type_main-medium`}>Регистрация</h1>
                    <Formik 
                        initialValues={initialValues} 
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}>
                        {({ values, handleChange, errors, touched, isValid, dirty }) => (
                            <Form className={`${formStyles.form} pt-6 pb-20`}>
                                <Input name={'name'} placeholder="Имя" value={values.name} onChange={handleChange} />
                                <EmailInput name={'email'} value={values.email} onChange={handleChange} extraClass="mt-6" />
                                <PasswordInput name={'password'} extraClass="mt-6 mb-6" value={values.password} onChange={handleChange}/>
                                <Button 
                                    htmlType="submit" 
                                    type="primary" 
                                    extraClass={`${formStyles.button}`}
                                    disabled={isLoading || !isValid || !dirty}
                                    size="medium">
                                    Зарегистрироваться
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <p className={`text text_type_main-default text_color_inactive ${formStyles.text}`} >Уже зарегистрированы? <Link to="/login" className={formStyles.link}>Войти</Link></p>
                </div>
            </div>
        </Container>
    );
}


export default Register;