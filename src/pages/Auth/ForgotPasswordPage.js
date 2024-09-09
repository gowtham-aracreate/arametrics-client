import React from 'react';
import AuthLayout from '../../layout/AuthLayout';
import ForgotPasswordForm from '../../components/Auth/ForgotPasswordForm';

const ForgotPasswordPage = () => {
    return (
        <AuthLayout>
            <ForgotPasswordForm />
        </AuthLayout>
    );
};

export default ForgotPasswordPage;
