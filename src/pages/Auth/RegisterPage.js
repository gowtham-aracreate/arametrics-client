import React from 'react'
import AuthLayout from '../../layout/AuthLayout'
import RegisterForm from '../../components/Auth/RegisterForm'

const RegisterPage = () => {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    )
}

export default RegisterPage