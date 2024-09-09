import React, { useEffect } from 'react';
import AuthLayout from '../../layout/AuthLayout';
import SetPasswordForm from '../../components/Auth/SetPasswordForm';
import { useLocation, useNavigate } from 'react-router-dom';

const SetPasswordPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const mode = location.state?.mode;
    const email = location.state?.email;

    useEffect(() => {
        if (['register', 'forgot'].includes(mode)) {
            return;
        }
        navigate('/');
    }, [navigate, mode]);

    if (!mode || !['register', 'forgot'].includes(mode)) {
        return null;
    }

    return (
        <AuthLayout>
            <SetPasswordForm mode={mode} email={email} />
        </AuthLayout>
    );
};

export default SetPasswordPage;
