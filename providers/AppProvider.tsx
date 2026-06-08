import React from 'react'
import { AuthProvider } from './AuthProvider'

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <AuthProvider>
                {children}
            </AuthProvider>
        </div>
    )
}

export default AppProvider