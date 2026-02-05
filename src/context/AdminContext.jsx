import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [tempConfig, setTempConfig] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('store_theme') || 'dark');

    // Load temp config from localStorage if it exists and apply theme
    useEffect(() => {
        const saved = localStorage.getItem('store_config_draft');
        if (saved) {
            try {
                setTempConfig(JSON.parse(saved));
            } catch (e) {
                console.error('Error loading saved config:', e);
            }
        }

        // Apply theme
        document.documentElement.className = theme === 'light' ? 'light-theme' : '';
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('store_theme', newTheme);
    };

    const login = (password) => {
        if (password === 'admin123') {
            setIsAdmin(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdmin(false);
    };

    const updateConfig = (newConfig) => {
        setTempConfig(newConfig);
        localStorage.setItem('store_config_draft', JSON.stringify(newConfig));
    };

    return (
        <AdminContext.Provider value={{ isAdmin, login, logout, tempConfig, updateConfig, theme, toggleTheme }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);
