import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../common/InputField';
import zxcvbn from 'zxcvbn';
import { setPasswordApi } from '../../api/apiRoutes';
import { errorMsg, success } from '../../util/toaster';
import { useNavigate } from 'react-router-dom';
import { LocalStorage } from '../../util/storage';


const schema = yup.object().shape({
    password: yup.string().min(8, 'Password must be at least 8 characters').max(20, 'Password must be within 20 characters').required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const SetPasswordForm = ({ mode, email }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();


    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const passwordStrength = zxcvbn(password);
    const strengthScore = passwordStrength.score;

    const getLineStyles = () => {
        const lineStyles = [];
        for (let i = 0; i < 5; i++) {
            lineStyles.push({
                width: i < strengthScore ? '25%' : '0%',
                backgroundColor: i < strengthScore ? getLineColor(i) : '#e0e0e0'
            });
        }
        return lineStyles;
    };

    const getLineColor = (index) => {
        const colors = ['#ff4d4d', '#ffff00', '#ffcc00', '#66ff66', '#285928'];
        return colors[index] || '#e0e0e0';
    };

    const getStrengthLabel = () => {
        const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
        return labels[strengthScore] || 'Very Weak';
    };

    const onSubmit = async (data) => {
        // try {
        // const response = await setPasswordApi({ email, password: data.confirmPassword, purpose: mode });
        // if (response.success) {
        //     if (mode === 'forgot') {
        //         success(response.message)
        //         LocalStorage.clearAll();
        //         navigate('/', { replace: true });
        //     } else if (mode === 'register') {
        navigate('/calendar/account', { replace: true });
        //         }
        //     }
        // } catch (error) {
        //     if (error?.message) errorMsg(error.message);
        // }
    };

    const handleBlur = () => {
        if (password === "") {
            setShowTooltip(false);
        }
        if (strengthScore > 2) {
            setShowTooltip(false);
        }
    }

    return (
        <form className='password-form' onSubmit={handleSubmit(onSubmit)}>
            <h1>{mode === 'forgot' ? 'Reset Your Password' : 'Set Up Your Password'}</h1>

            <div className="password-container">

                <InputField
                    id="password"
                    label="New Password:"
                    // type={showPassword ? "text" : "password"}
                    type={"password"}
                    placeholder="Enter new password"
                    register={register}
                    error={errors.password}
                    visible={showPassword}
                    toggleIcon={() => setShowPassword(!showPassword)}
                    hasIcon={true}
                    onInput={(event) => { setShowTooltip(true); setPassword(event.target.value) }}
                    onBlur={handleBlur}
                />
                {showTooltip && (
                    <div className="password-strength-container">
                        <div className="password-strength">
                            <div className="password-strength-bar">
                                {getLineStyles().map((style, index) => (
                                    <div key={index} className="password-strength-line" style={style} />
                                ))}
                            </div>
                            <div className="strength-label">{getStrengthLabel()}</div>
                        </div>

                        <div className="password-help">
                            <span className="tooltip-icon">?</span>
                            <div className="tooltip-content">
                                <p>Recommended: Password should be between 8 and 16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <InputField
                id="confirmPassword"
                label="Confirm Password:"
                type="password"
                placeholder="Confirm your new password"
                register={register}
                error={errors.confirmPassword}
            />

            <button type="submit">Submit</button>
        </form>
    );
};

export default SetPasswordForm;
