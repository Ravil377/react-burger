import profileStyles from './css/profile.module.css';
import Container from '../components/container/container';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate, NavLink, Routes, Route, Outlet } from 'react-router-dom';
import { logOutUser, patchUser } from '../services/actions/user';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { IUserProps, useAppDispatch, useAppSelector } from '../utils/chema';
import { FeedList } from '../components/feed';
import { ws } from '../utils/constants';
import { useEffect } from 'react';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../services/actions/socket';

export const ProfileOrdersHistory = () => {
    const { orders } = useAppSelector(store => store.ws);
    const dispatch = useAppDispatch();
    const token = localStorage.getItem("accessToken");
    let tokenValue;
    if(token) {
        const parts = token.split(' ');
        tokenValue = parts[1];
    }

    const wsUrl = ws + `/orders?token=${tokenValue}`;

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: wsUrl
        });

        return () => {
            dispatch({
                type: WS_CONNECTION_CLOSED
            });
        };
    }, [dispatch, wsUrl]);

    return (
        <div>
            <FeedList />
        </div>
    )
}

export const ProfileUser = () => {
    const dispatch = useAppDispatch();

    const user = useAppSelector( store => store.user.user );

    const initialValues = {
        email: user ? user.email : '',
        password: '',
        name: user ? user.name : ''
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

    const handleSubmit = (values: IUserProps, formikHelpers: FormikHelpers<IUserProps>) => {
        dispatch(patchUser(values));
        formikHelpers.resetForm();
    }

    return (
        <div className={profileStyles.profile}>
            <Formik 
                initialValues={initialValues} 
                onSubmit={handleSubmit}
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
                            extraClass="mt-6" />
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
    )
}

function Profile() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onClick = () => {
        dispatch(logOutUser());
        navigate('/login');
    }

    return (
        <Container >
            <div className={profileStyles.container}>
                <div className={profileStyles.menu__container}>
                    <ul className={`${profileStyles.menu}`} >
                        <li>
                            <NavLink 
                                className={`${profileStyles.link} text text_type_main-medium`} 
                                to="/profile"
                                end
                            >
                                Профиль
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className={`${profileStyles.link} text text_type_main-medium`} 
                                to="/profile/orders"
                            >
                                История заказов
                            </NavLink>
                        </li>
                        <li><NavLink className={`${profileStyles.link} text text_type_main-medium`} to="/" onClick={onClick}>Выход</NavLink></li>
                        <li className='text text_type_main-default text_color_inactive mt-20'>В этом разделе вы можете изменить свои персональные данные</li>
                    </ul>
                    <div className={profileStyles.menu__content}>
                        <Outlet /> 
                    </div>
                </div>
            </div>
        </Container>
    );
}


export default Profile;