import React from 'react';

type AuthProps = {
    children: React.ReactNode
};

const AuthLayout:React.FC<AuthProps> = ({children}) => {
    
    return <div className='flex items-center justify-center h-full'>{children}</div>
}
export default AuthLayout;