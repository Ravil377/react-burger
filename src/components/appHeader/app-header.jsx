import headerStyles from './app-header.module.css';
import Container from '../container/container';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {CONSTRUCTOR, ORDERS, PERSONAL} from '../../utils/constants';
import { Link, useLocation } from 'react-router-dom';

function AppHeader() {
    const location = useLocation();
    return (
        <header className={`pt-4 pb-4 ${headerStyles.header}`} >
            <Container>
                <nav className={headerStyles.nav} >
                    <div className={headerStyles.buttons}>
                        <Link to="/" className={`${headerStyles.button} ${location.pathname === "/" ? headerStyles.active : ''} pt-4 pb-4 pl-5 pr-5`}>
                            <BurgerIcon style={{background: 'unset'}} pe="primary" /> {CONSTRUCTOR}
                        </Link>
                        <Link to="/coomingsoon" className={`${headerStyles.button} ${location.pathname === "/coomingsoon" ? headerStyles.active : ''} pt-4 pb-4 pl-5 pr-5`} >
                            <ListIcon style={{background: 'unset'}} pe="primary" /> {ORDERS}
                        </Link>
                    </div>
                    <Logo />
                    <div className={headerStyles.buttons}>
                        <Link to="/profile" className={`${headerStyles.button} ${location.pathname === "/profile" ? headerStyles.active : ''} pt-4 pb-4 pl-5 pr-5`} >
                            <ProfileIcon type="primary" /> {PERSONAL}
                        </Link>
                    </div>
                </nav>
            </Container>
        </header>
    );
}

export default AppHeader;