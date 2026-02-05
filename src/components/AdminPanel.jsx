import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Save, LogOut, Copy, Check, Sun, Moon } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { storeConfig } from '../data/storeConfig';

const AdminPanel = () => {
    const { isAdmin, logout, tempConfig, theme, toggleTheme } = useAdmin();
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleExport = () => {
        const dataToExport = tempConfig || storeConfig;
        const jsonString = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([`export const storeConfig = ${jsonString};`], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'storeConfig.js';
        link.click();
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = () => {
        const dataToExport = tempConfig || storeConfig;
        const content = `export const storeConfig = ${JSON.stringify(dataToExport, null, 2)};`;
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isAdmin) return null;

    return (
        <>
            <div className="admin-badge" onClick={() => setIsOpen(!isOpen)}>
                <Settings size={20} className={isOpen ? 'spin' : ''} />
                <span>Painel Admin</span>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="admin-panel"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>Gerenciamento</h3>
                            <button
                                onClick={toggleTheme}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', color: 'var(--secondary-accent)' }}
                                title="Trocar Tema"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>

                        <button className="btn-primary" onClick={handleExport}>
                            <Save size={18} />
                            Salvar Alterações (Download)
                        </button>

                        <button className="btn-outline" onClick={copyToClipboard}>
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                            {copied ? 'Copiado!' : 'Copiar Config (JS)'}
                        </button>

                        <p style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '10px' }}>
                            * Após baixar o arquivo, substitua-o na pasta <code>src/data/storeConfig.js</code>
                        </p>

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0.5rem 0' }}></div>

                        <button className="btn-danger" onClick={logout}>
                            <LogOut size={18} />
                            Sair do Painel
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AdminPanel;
