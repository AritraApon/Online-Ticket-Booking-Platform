import LogInForm from '@/Components/Auth/LogInForm';
import React from 'react';

export const metadata = {
  title: "TicketBari - Log In",
  description: "Online ticket booking platform",
};
const LogInPage = () => {
    return (
        <div>
            <LogInForm/>
        </div>
    );
};

export default LogInPage;