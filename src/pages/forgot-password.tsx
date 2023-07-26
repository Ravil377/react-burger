import formStyles from './css/form.module.css';
import Container from '../components/container/container';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom';
import { forgotPasswordUser } from '../services/actions/user';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { IForgotPasswordUserProps } from '../utils/chema';

function ForgotPassword() {
    const dispatch = useDispatch();
    // @ts-ignore
    const { isLoading } = useSelector(state => state.user);
    const navigate = useNavigate();

    const handleSubmit = (values: IForgotPasswordUserProps) => {
        // @ts-ignore
        dispatch(forgotPasswordUser(values));
        navigate('/reset-password');
    }

    const initialValues = {
        email: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Введите корректный email')
            .required('Введите email'),
    });

    return (
        <Container >
            <div className={formStyles.container}>
                <div className={formStyles.form__container}>
                    <h1 className={`${formStyles.title} text text_type_main-medium`}>Восстановление пароля</h1>
                    <Formik 
                        initialValues={initialValues} 
                        onSubmit={(values)=>handleSubmit(values)}
                        validationSchema={validationSchema}>
                    {({ values, handleChange, errors, touched, isValid, dirty }) => (
                        <Form className={`${formStyles.form} pt-6 pb-20`} >
                            <EmailInput name={'email'} value={values.email} onChange={handleChange} extraClass="mb-6" placeholder="Укажите e-mail" />
                            <Button 
                                htmlType="submit" 
                                type="primary" 
                                extraClass={`${formStyles.button}`}
                                disabled={isLoading || !isValid || !dirty}
                                size="medium" >
                                Восстановить
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


export default ForgotPassword;