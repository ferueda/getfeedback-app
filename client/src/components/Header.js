import React from 'react';

const Header = () => {
  return (
    <nav className="container max-w-full flex justify-between content-center bg-indigo-600 text-white shadow">
      <a className="text-3xl font-bold align-middle m-4" href="#">
        getFeedback
      </a>
      <ul className="block flex items-center">
        <a
          className="h-full flex items-center text-xl px-6 transition ease-out duration-200 hover:bg-indigo-700"
          href="#"
        >
          Login
        </a>
      </ul>
    </nav>
  );
};

export default Header;
