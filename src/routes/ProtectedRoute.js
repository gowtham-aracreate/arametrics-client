import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
    const isAuthenticated = Cookies.get('sessionToken');
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
