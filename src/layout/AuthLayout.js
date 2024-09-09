import React from 'react';
import logo from '../assets/images/logo.png'

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__logo">
        <img src={logo} alt='aracreate logo' />
      </div>
      <div className="auth-layout__content">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
