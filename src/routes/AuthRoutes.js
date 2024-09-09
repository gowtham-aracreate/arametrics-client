import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const RegisterPage = React.lazy(() => import('../pages/Auth/RegisterPage'));
const SetPasswordPage = React.lazy(() => import('../pages/Auth/SetPasswordPage'));
const OtpPage = React.lazy(() => import('../pages/Auth/OtpPage'));
const LoginPage = React.lazy(() => import('../pages/Auth/LoginPage'));
const ForgotPasswordPage = React.lazy(() => import('../pages/Auth/ForgotPasswordPage'));

const AuthRoutes = () => {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const accessToken = Cookies.get('sessionToken');
    //     if (accessToken) {
    //         navigate('/calendar');
    //     }
    // }, [navigate]);
    return (
        <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/otp-verification" element={<OtpPage />} />
            <Route path="/set-password" element={<SetPasswordPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
    );
};

export default AuthRoutes;
