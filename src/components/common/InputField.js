import React from 'react';
import closeEye from '../../assets/images/closeEye.png'
import openEye from '../../assets/images/openEye.png'

const InputField = ({ id, label, type = 'text', placeholder, register, error, hasIcon = false, customStyle, toggleIcon = () => { }, visible = false, ...rest }) => {
    return (
        <div style={customStyle}>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={hasIcon ? visible ? "text" : "password" : type}
                placeholder={placeholder}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${id}-error` : undefined}
                {...register(id)} {...rest} />
            {hasIcon && type === "password" && <span className='eye-icon' onClick={toggleIcon}><img alt='eye-icon' src={visible ? openEye : closeEye} /></span>}
            {error && <p id={`${id}-error`}>{error.message}</p>}
        </div>
    );
};

export default InputField;
