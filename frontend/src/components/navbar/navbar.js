import React, { useContext } from 'react';
import { MyContext } from '../../context/my-context/my-context';

const Navbar = () => {
    const { isReady, IsActive } = useContext(MyContext);
    return (
        <nav className="blue">
            <div className="container">
                <div className="navbar nav-wrapper">
                    <span onClick={() => IsActive(null)} className="brand-logo">Todo App</span>
                    {
                        isReady === null ? (
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li onClick={() => IsActive(1)}><a>Выйти</a></li>
                            </ul>
                        ) : (
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li onClick={() => IsActive(2)}><a>Регистрация</a></li>
                                <li onClick={() => IsActive(1)}><a>Войти</a></li>
                            </ul>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;