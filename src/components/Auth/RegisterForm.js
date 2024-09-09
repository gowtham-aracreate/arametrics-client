import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../common/InputField';
import { googleSignupApi, registerApi } from '../../api/apiRoutes';
import { success, errorMsg } from '../../util/toaster';
import googleIcon from '../../assets/images/google.svg';
import Cookies from 'js-cookie';

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();

    useEffect(() => {
        // const authError = Cookies.get('auth_error');
        // if (authError) {
        //     errorMsg(authError);
        //     Cookies.remove('auth_error');
        // }
    }, [navigate])

    const onSubmit = async (formData) => {
        navigate('/otp-verification', { state: { mode: 'register', email: formData.email } });
    };

    const handleOAuthSignup = async () => {
        // const { url } = await googleSignupApi();
        // if (url) {
        //     window.location.href = url
        // }
    }

    return (
        <div className="register-form">
            <h1>Create New Account</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    id="firstName"
                    label="First Name:"
                    placeholder="John"
                    register={register}
                    error={errors.firstName}
                />
                <InputField
                    id="lastName"
                    label="Last Name:"
                    placeholder="Bohn"
                    register={register}
                    error={errors.lastName}
                />
                <InputField
                    id="email"
                    label="Email:"
                    type="email"
                    placeholder="example@aracreate.com"
                    register={register}
                    error={errors.email}
                />
                <div>
                    <label htmlFor="terms">
                        <input
                            type="checkbox"
                            id="terms"
                            {...register('terms')}
                        />
                        <span> I accept the <a href="/terms">Terms and Conditions</a> and <a href="/privacy">Privacy Policy</a></span>
                    </label>
                    {errors.terms && <p>{errors.terms.message}</p>}
                </div>

                <button type="submit">
                    Register
                </button>
            </form>
            <div className='footer'>
                <div>
                    <span></span>
                    Or
                    <span></span>
                </div>
                <button type='button' className='auth-button' onClick={() => handleOAuthSignup()}><span><img alt='google icon' src={googleIcon}></img></span>Sign in with Google</button>
                <p>Already have an account? <Link to={'/'}>Login Now</Link></p>
            </div>
        </div>
    );
};

export default RegisterForm;
