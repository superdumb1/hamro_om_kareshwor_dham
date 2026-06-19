"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ne';

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [lang, setLangState] = useState<Language>('en');

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language') as Language;
        if (storedLanguage === 'en' || storedLanguage === 'ne') {
            setLangState(storedLanguage);
        }
    }, []);

    const setLang = (newLang: Language) => {
        setLangState(newLang);
        localStorage.setItem('language', newLang);
    };

    const toggleLang = () => {
        setLang(lang === 'en' ? 'ne' : 'en');
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};