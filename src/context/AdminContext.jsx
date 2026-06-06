import React, { createContext, useContext, useState, useEffect } from 'react';
import { validatePassword } from '../utils/security';
import { useSiteContent } from '../hooks/useSiteContent';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(() => {
        return localStorage.getItem('isAdminAuthenticated') === 'true';
    });
    const [theme, setTheme] = useState(localStorage.getItem('store_theme') || 'dark');
    const [activeCategoryTab, setActiveCategoryTab] = useState(null);
    
    // Inicializa o hook de conteúdo de planilhas
    const siteContentState = useSiteContent();

    useEffect(() => {
        // Apply theme
        document.documentElement.className = theme === 'light' ? 'light-theme' : '';
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('store_theme', newTheme);
    };

    const login = async (password) => {
        const isValid = await validatePassword(password);
        if (isValid) {
            setIsAdmin(true);
            localStorage.setItem('isAdminAuthenticated', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        if (confirm('Deseja encerrar a sessão administrativa?')) {
            setIsAdmin(false);
            localStorage.removeItem('isAdminAuthenticated');
            window.location.reload();
        }
    };

    return (
        <AdminContext.Provider value={{ 
            isAdmin, 
            login, 
            logout, 
            theme, 
            toggleTheme, 
            activeCategoryTab,
            setActiveCategoryTab,
            // Aliases de compatibilidade para componentes antigos
            tempConfig: siteContentState.content,
            updateConfig: siteContentState.updateWholeConfig,
            // Expõe todas as funcionalidades de planilhas e produtos
            ...siteContentState
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);
