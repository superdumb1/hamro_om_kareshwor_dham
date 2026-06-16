import React from 'react'
import { AuthProvider } from './AuthProvider'
import QueryProvider from './QueryProvider'

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <QueryProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </QueryProvider>
        </div>
    )
}

export default AppProvider