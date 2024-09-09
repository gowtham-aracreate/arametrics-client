/**
 * @file /Users/gowtham/code/projects/arametrics/system/client/src/components/Auth/LoginForm.js
 * @author Gowtham <gowtham@aracreate.com>
 * @version 2.0.0
 * @license Apache-2.0
 * @copyright 2024 araCreate GmbH
 */

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../common/InputField';
import { googleLoginApi, loginApi } from '../../api/apiRoutes';
import { errorMsg, success } from '../../util/toaster';
import googleIcon from '../../assets/images/google.svg';
import Cookies from 'js-cookie';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // useEffect(() => {
    //     const authError = Cookies.get('auth_error');
    //     if (authError) {
    //         errorMsg(authError);
    //         Cookies.remove('auth_error');
    //     }
    // }, [navigate])
    const handleOAuthLogin = async () => {
        // const { url } = await googleLoginApi();
        // if (url) {
        //     window.location.href = url
        // }
    }


    const onSubmit = async (formData) => {
        // try {
        //     const response = await loginApi(formData);
        //     if (response.success) {
        //         success(response.message)
        navigate('/calendar/account');
        //     }
        // } catch (error) {
        //     errorMsg(error.message || "An error occurred. Please try again.");
        // }
    };

    return (
        <div className="login-form">
            <h1>Welcome to araMetrics</h1>
            <h4>Please sign in with your registered email.</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    id="email"
                    label="Email:"
                    type="email"
                    placeholder="example@aracreate.com"
                    register={register}
                    error={errors.email}
                />
                <InputField
                    id="password"
                    label="Password:"
                    type="password"
                    placeholder="********"
                    register={register}
                    toggleIcon={() => setShowPassword(!showPassword)}
                    hasIcon={true}
                    visible={showPassword}
                    error={errors.password}
                />
                <p className='forgot_password' onClick={() => navigate('/forgot-password')}>Forgot Password?</p>

                <button type="submit">
                    Login
                </button>
            </form>
            <div className='footer'>
                <div>
                    <span></span>
                    Or
                    <span></span>
                </div>
                <button type='button' className='auth-button' onClick={() => handleOAuthLogin()}><span><img alt='google icon' src={googleIcon}></img></span>Sign in with Google</button>
                <p>Don't have an account? <Link to={'/register'}>Register Now</Link></p>
            </div>
        </div>
    );
};

export default LoginForm;