import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Save, LogOut, Copy, Check, Sun, Moon, RotateCcw, Database } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { storeConfig } from '../data/storeConfig';

const AdminPanel = () => {
    const { 
        isAdmin, 
        logout, 
        exitEditMode,
        theme, 
        toggleTheme,
        content,
        updateSheetConfig,
        saveContent,
        resetContent,
        isSaving,
        lastSync
    } = useAdmin();

    const [isOpen, setIsOpen] = useState(false);
    const [showConfigUrls, setShowConfigUrls] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleExport = () => {
        const dataToExport = { ...content };
        delete dataToExport.config; // Remove URL configs from the exported code
        
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
        const dataToExport = { ...content };
        delete dataToExport.config;
        
        const contentString = `export const storeConfig = ${JSON.stringify(dataToExport, null, 2)};`;
        navigator.clipboard.writeText(contentString);
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
                        style={{
                            maxHeight: '85vh',
                            overflowY: 'auto',
                            width: '320px',
                            zIndex: 11000
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--secondary-accent)' }}>Gerenciamento</h3>
                        </div>

                        {lastSync && (
                            <div style={{
                                fontSize: '0.65rem',
                                color: 'rgba(255,255,255,0.4)',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '6px',
                                padding: '6px 10px',
                                textAlign: 'center',
                                fontFamily: 'monospace'
                            }}>
                                SINCRONIZADO: {lastSync.toLocaleTimeString()}
                            </div>
                        )}

                        {/* Ações da Planilha */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <button 
                                className="btn-primary" 
                                onClick={saveContent} 
                                disabled={isSaving}
                                style={{ background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', color: 'white', opacity: isSaving ? 0.7 : 1, border: 'none' }}
                            >
                                <Save size={18} />
                                {isSaving ? 'Salvando...' : 'Salvar na Planilha'}
                            </button>

                            <button 
                                className="btn-outline" 
                                onClick={resetContent}
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                            >
                                <RotateCcw size={16} />
                                Recarregar Planilha
                            </button>
                        </div>

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                            <button 
                                className="btn-outline" 
                                onClick={exitEditMode} 
                                style={{ width: '100%', justifyContent: 'center', color: '#facc15', borderColor: 'rgba(250, 204, 21, 0.3)' }}
                            >
                                Sair do Modo Edição
                            </button>
                            <button className="btn-danger" onClick={logout} style={{ width: '100%' }}>
                                <LogOut size={18} />
                                Encerrar Sessão
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AdminPanel;
