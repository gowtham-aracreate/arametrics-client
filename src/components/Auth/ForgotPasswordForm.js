import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import InputField from '../common/InputField';
import { errorMsg, success } from '../../util/toaster';
import { forgotPasswordApi } from '../../api/apiRoutes';
import { LocalStorage } from '../../util/storage';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPasswordForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();


    const onSubmit = async (formData) => {
        try {
            const response = await forgotPasswordApi(formData);
            if (response.success) {
                LocalStorage.setItem('userId', response.userId);
                success(response.message);
            }
            navigate('/otp-verification', { state: { mode: "forgot", email: formData.email } })

        } catch (error) {
            errorMsg(error.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="forgot-password-form">
            <h1>Forgot Password</h1>
            <h4>Please enter your registered email</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    id="email"
                    label="Email:"
                    type="email"
                    placeholder="example@aracreate.com"
                    register={register}
                    error={errors.email}
                />
                <button type="submit">
                    Continue
                </button>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
