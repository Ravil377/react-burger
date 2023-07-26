import formStyles from './css/form.module.css';
import Container from '../components/container/container';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate, Link } from 'react-router-dom';
import { resetPasswordUser } from '../services/actions/user';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { IResetPasswordUserProps } from '../utils/chema';


function ResetPassword() {
    const dispatch = useDispatch();
    // @ts-ignore
    const { isLoading } = useSelector(state => state.user);
    const navigate = useNavigate();

    const handleSubmit = (values:IResetPasswordUserProps) => {
        // @ts-ignore
        dispatch(resetPasswordUser(values));
        navigate('/login');
    }

    const initialValues = {
        password: '',
        token: '',
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Введите пароль'),
        token: Yup.string()
            .required('Введите токен')
    });

    return (
        <Container >
            <div className={formStyles.container}>
                <div className={formStyles.form__container}>
                    <h1 className={`${formStyles.title} text text_type_main-medium`}>Восстановление пароля</h1>
                    <Formik 
                        initialValues={initialValues} 
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}>
                            {({ values, handleChange, errors, touched, isValid, dirty }) => (
                                <Form className={`${formStyles.form} pt-6 pb-20`}>
                                    <PasswordInput name='password' extraClass="mt-6" placeholder="Введите новый пароль" value={values.password} onChange={handleChange}/>
                                    <Input placeholder="Введите код из письма" name="token" extraClass="mt-6 mb-6" value={values.token} onChange={handleChange} />
                                    <Button 
                                        htmlType="submit" 
                                        type="primary" 
                                        extraClass={`${formStyles.button}`}
                                        disabled={isLoading || !isValid || !dirty}
                                        size="medium">
                                        Сохранить
                                    </Button>
                                </Form>
                            )}
                    </Formik>
                    <p className={`text text_type_main-default text_color_inactive ${formStyles.text}`} >Вспомнили пароль? <Link to="#" className={formStyles.link}>Войти</Link></p>
                </div>
            </div>
        </Container>
    );
}


export default ResetPassword;