import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const Header = () => {
  const user = useContext(UserContext);

  const renderContent = () => {
    switch (user) {
      case null:
        return;
      case false:
        return (
          <a
            className="h-full flex items-center text-xl px-6 transition ease-out duration-200 hover:bg-indigo-700"
            href="/auth/google"
          >
            Login with Google
          </a>
        );
      default:
        return (
          <div className="h-full flex items-center text-xl">
            {user._id}
            <a
              className="h-full flex items-center px-6 transition ease-out duration-200 hover:bg-indigo-700 ml-4"
              href="/api/logout"
            >
              Logout
            </a>
          </div>
        );
    }
  };

  return (
    <nav className="container max-w-full flex-auto justify-center bg-indigo-600 text-white shadow">
      <div className="flex justify-between content-center max-w-screen-lg mx-auto">
        <Link to={user ? '/surveys' : '/'} className="text-3xl font-bold align-middle m-4">
          getFeedback
        </Link>
        <div className="flex items-center">{renderContent()}</div>
      </div>
    </nav>
  );
};

export default Header;
