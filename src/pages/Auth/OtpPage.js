import React, { useEffect } from 'react';
import AuthLayout from '../../layout/AuthLayout';
import OtpForm from '../../components/Auth/OtpForm';
import { useLocation, useNavigate } from 'react-router-dom';

const OtpPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const mode = location.state?.mode;
    const email = location.state?.email;

    useEffect(() => {
        if (['register', 'forgot', 'login'].includes(mode)) {
            return;
        }
        navigate('/');
    }, [navigate, mode]);

    if (!mode || !['register', 'forgot', 'login'].includes(mode)) {
        return null;
    }

    return (
        <AuthLayout>
            <OtpForm mode={mode} email={email} />
        </AuthLayout>
    );
};

export default OtpPage;
