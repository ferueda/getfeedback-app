import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import './Header.css';

const Header = () => {
  const user = useContext(UserContext);

  const renderContent = () => {
    switch (user) {
      case null:
        return;
      case false:
        return (
          <div className="main-av__menu__items">
            <a className="" href="/auth/google">
              Login with Google
            </a>
          </div>
        );
      default:
        return (
          <div className="main-av__menu__items">
            {user._id}
            <a className="" href="/api/logout">
              Logout
            </a>
          </div>
        );
    }
  };

  return (
    <nav className="main-nav">
      <div className="container main-nav__content-container content-center max-w-screen-lg mx-auto">
        <Link to={user ? '/surveys' : '/'} className="main-nav__logo">
          getFeedback
        </Link>
        <div className="main-nav__menu">{renderContent()}</div>
      </div>
    </nav>
  );
};

export default Header;
