import profileStyles from './css/profile.module.css';
import Container from '../components/container/container';
import { EmailInput, PasswordInput, Button, Input, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

function Profile() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onChangeEmail = e => setEmail(e.target.value);
    const onChangePassword = e => setPassword(e.target.value);
    const onChangeName = e => setName(e.target.value);

    return (
        <Container >
            <div className={profileStyles.container}>
                <div className={profileStyles.menu__container}>
                    <ul className={`${profileStyles.menu}`} >
                        <li><Link className={`${profileStyles.link} text text_type_main-medium`} to="">Профиль</Link></li>
                        <li><Link className={`${profileStyles.link} text text_type_main-medium`} to="">История заказов</Link></li>
                        <li><Link className={`${profileStyles.link} text text_type_main-medium`} to="">Выход</Link></li>
                        <li className='text text_type_main-default text_color_inactive mt-20'>В этом разделе вы можете изменить свои персональные данные</li>
                    </ul>
                    <div className={profileStyles.menu__content}>
                        <div className={profileStyles.profile}>
                            <Input placeholder="Имя" value={name} onChange={onChangeName} icon="EditIcon"/>
                            <EmailInput placeholder="Логин" value={email} onChange={onChangeEmail} extraClass="mt-6" icon="EditIcon"/>
                            <PasswordInput placeholder="Пароль" extraClass="mt-6 mb-6" value={password} onChange={onChangePassword} icon="EditIcon"/>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}


export default Profile;