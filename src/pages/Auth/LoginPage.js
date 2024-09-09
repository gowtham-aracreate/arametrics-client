import React from 'react';
import AuthLayout from '../../layout/AuthLayout';
import LoginForm from '../../components/Auth/LoginForm';

const LoginPage = () => {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
};

export default LoginPage;
