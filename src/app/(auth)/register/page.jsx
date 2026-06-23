import RegisterForm from '@/Components/Auth/RegisterForm';
import React from 'react';

export const metadata = {
  title: "TicketBari- Register",
  description: "Online ticket booking platform",
};
const RegisterPage = () => {
    return (
        <div>
            <RegisterForm/>
        </div>
    );
};

export default RegisterPage;