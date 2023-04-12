import headerStyles from './app-header.module.css';
import Container from '../container/container';
import { Button, Box, BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {CONSTRUCTOR, ORDERS, PERSONAL} from '../../utils/constants';


function AppHeader() {
    return (
        <header className={`pt-4 pb-4 ${headerStyles.header}`} >
            <Container>
                <nav className={headerStyles.nav} >
                    <div className={headerStyles.buttons}>
                        <a>
                            <Button htmlType="button" className={`${headerStyles.button} ${headerStyles.active} pt-4 pb-4 pl-5 pr-5`}>
                                <BurgerIcon style={{background: 'unset'}} pe="primary" /> {CONSTRUCTOR}
                            </Button>
                        </a>
                        <a>
                            <Button htmlType="button" className={`${headerStyles.button} pt-4 pb-4 pl-5 pr-5`} >
                                <ListIcon style={{background: 'unset'}} pe="primary" /> {ORDERS}
                            </Button>
                        </a>
                    </div>
                    <Logo />
                    <div className={headerStyles.buttons}>
                        <a>
                            <Button htmlType="button" className={`${headerStyles.button} pt-4 pb-4 pl-5 pr-5`} >
                                <ProfileIcon type="primary" /> {PERSONAL}
                            </Button>
                        </a>
                    </div>
                </nav>
            </Container>
        </header>
    );
}

export default AppHeader;