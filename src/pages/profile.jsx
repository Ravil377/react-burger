import profileStyles from './css/profile.module.css';
import Container from '../components/container/container';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate, NavLink } from 'react-router-dom';
import { logOutUser, patchUser } from '../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector( state => state.user.user );

    const initialValues = {
        email: user.email,
        password: '',
        name: user.name
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Введите корректный email')
            .required('Введите email'),
        password: Yup.string()
            .required('Введите пароль'),
        name: Yup.string()
            .required('Введите имя'),
    });

    const onClick = () => {
        dispatch(logOutUser());
        navigate('/login');
    }

    const handleSubmit = (values) => dispatch(patchUser(values));

    return (
        <Container >
            <div className={profileStyles.container}>
                <div className={profileStyles.menu__container}>
                    <ul className={`${profileStyles.menu}`} >
                        <li>
                            <NavLink 
                                className={({ isActive, isPending }) => isPending 
                                    ? `${profileStyles.link} text text_type_main-medium` 
                                    : isActive ? `${profileStyles.link} ${profileStyles.linkActive} text text_type_main-medium` : '' 
                            
                                } 
                                to="/profile"
                                >Профиль
                            </NavLink>
                        </li>
                        <li><NavLink className={`${profileStyles.link} text text_type_main-medium`} to="/profile?=order">История заказов</NavLink></li>
                        <li><NavLink className={`${profileStyles.link} text text_type_main-medium`} to="/" onClick={onClick}>Выход</NavLink></li>
                        <li className='text text_type_main-default text_color_inactive mt-20'>В этом разделе вы можете изменить свои персональные данные</li>
                    </ul>
                    <div className={profileStyles.menu__content}>
                        <div className={profileStyles.profile}>
                            <Formik 
                                initialValues={initialValues} 
                                onSubmit={(values)=>handleSubmit(values)}
                                validationSchema={validationSchema}>
                                {({ values, handleChange, handleReset, errors, touched, isValid, dirty }) => (
                                    <Form >
                                        <Input 
                                            name="name"
                                            placeholder="Имя" 
                                            value={values.name} 
                                            onChange={handleChange} 
                                            icon="EditIcon"/>
                                        <EmailInput 
                                            name='email'
                                            placeholder="Логин"
                                            value={values.email} 
                                            onChange={handleChange}
                                            extraClass="mt-6" 
                                            icon="EditIcon"/>
                                        <PasswordInput 
                                            name="password"
                                            placeholder="Пароль" 
                                            extraClass="mt-6 mb-6" 
                                            value={values.password} 
                                            onChange={handleChange} 
                                            icon="EditIcon"/>
                                        <Button 
                                            htmlType="button" 
                                            onClick={handleReset}
                                            type="primary" 
                                            extraClass="mr-6" 
                                            disabled={!dirty}
                                            size="medium">
                                            Отмена
                                        </Button>
                                        <Button 
                                            htmlType="submit" 
                                            type="primary" 
                                            disabled={!isValid || !dirty}
                                            size="medium">
                                            Сохранить
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}


export default Profile;