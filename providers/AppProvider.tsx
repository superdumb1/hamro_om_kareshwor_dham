import React from 'react'
import { AuthProvider } from './AuthProvider'
import QueryProvider from './QueryProvider'
import { LanguageProvider } from './LanguageToggle'

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <LanguageProvider>
                <QueryProvider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </QueryProvider>
            </LanguageProvider>
        </div>
    )
}

export default AppProvider