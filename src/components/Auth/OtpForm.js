import React, { useState, useEffect } from 'react';
import OTPInput from 'react18-input-otp';
import { useNavigate } from 'react-router-dom';
import { otpVerifyApi } from '../../api/apiRoutes';
import { success, errorMsg } from '../../util/toaster';
import { otpResendApi } from '../../api/apiRoutes';

const OtpForm = ({ mode, email }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(30);

    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const handleOtpChange = (otp) => {
        setSuccess(false);
        setError(false);
        setOtp(otp);
    };

    const getTitle = () => {
        switch (mode) {
            case 'login':
                return 'Login Verification';
            case 'register':
                return 'Account Verification';
            case 'reset':
                return 'Reset Verification';
            default:
                return 'Verification';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(otp);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const onSubmit = async (pin) => {
        setError(false);
        if (pin === '' || pin.length < 4) {
            setError(true);
            return;
        }

        setSuccess(true);
        if (mode === 'register') {
            navigate('/set-password', { state: { mode: 'register', email } });
        } else if (mode === 'forgot') {
            navigate('/set-password', { state: { mode: 'forgot', email } });
        }


    };

    const handleResend = async () => {
        setResendDisabled(true);
        setCountdown(30);
        // try {
        //     const data = await otpResendApi({ userId, purpose: mode, email });
        //     if (data.success) {
        //         setOtp('');
        //         success('OTP sent successfully!');
        //     }
        // } catch (error) {
        //     setResendDisabled(false);
        //     if (error?.message) {
        //         errorMsg(error.message);
        //     }
        // }
    };

    useEffect(() => {
        let timer;
        if (resendDisabled && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setResendDisabled(false);
        }
        return () => clearInterval(timer);
    }, [resendDisabled, countdown]);

    return (
        <div className="otp-page">
            <h1>{getTitle()}</h1>
            <h3>Enter the 4-digit OTP sent to your registered email.</h3>
            <form onSubmit={handleSubmit}>
                <p>Didn't receive an email?<span
                    onClick={!resendDisabled ? handleResend : null}
                    style={{ cursor: resendDisabled ? 'not-allowed' : 'pointer' }}
                >
                    Resend OTP {resendDisabled && `(${countdown}s)`}
                </span>
                </p>
                <OTPInput
                    value={otp}
                    onChange={handleOtpChange}
                    numInputs={4}
                    separator={<span></span>}
                    inputStyle={`otp-input ${error ? 'otp-input__error' : ''} ${isSuccess ? 'otp-input__success' : ''}`}
                    containerStyle="otp-container"
                    isInputNum
                    onKeyDown={handleKeyDown}
                />
                <button className='auth-button' type='submit'>Verify OTP</button>
            </form>
        </div>
    );
};

export default OtpForm;
