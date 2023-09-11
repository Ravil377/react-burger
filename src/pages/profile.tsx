import profileStyles from './css/profile.module.css';
import Container from '../components/container/container';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import { logOutUser } from '../services/actions/user';
import { useAppDispatch } from '../utils/chema';

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