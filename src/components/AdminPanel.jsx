import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Save, LogOut, Copy, Check, Sun, Moon, RotateCcw, Database } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { storeConfig } from '../data/storeConfig';

const AdminPanel = () => {
    const { 
        isAdmin, 
        logout, 
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
                            <button
                                onClick={toggleTheme}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', color: 'var(--secondary-accent)' }}
                                title="Trocar Tema"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
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
                                style={{ background: '#15803d', color: 'white', opacity: isSaving ? 0.7 : 1 }}
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

                        {/* Configuração de URLs */}
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem' }}>
                            <button
                                onClick={() => setShowConfigUrls(!showConfigUrls)}
                                className="btn-outline"
                                style={{
                                    width: '100%',
                                    fontSize: '0.75rem',
                                    justifyContent: 'center',
                                    borderColor: showConfigUrls ? 'var(--secondary-accent)' : 'var(--glass-border)',
                                    color: showConfigUrls ? 'var(--secondary-accent)' : 'inherit'
                                }}
                            >
                                <Database size={16} />
                                {showConfigUrls ? 'Fechar URLs' : 'Configurar Planilha'}
                            </button>

                            <AnimatePresence>
                                {showConfigUrls && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', textAlign: 'left' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                                <label style={{ fontSize: '0.65rem', opacity: 0.6, fontWeight: '700' }}>CONTEÚDO DO SITE (CSV)</label>
                                                <input 
                                                    type="text" 
                                                    className="form-input" 
                                                    style={{ padding: '8px', fontSize: '0.75rem', borderRadius: '8px', width: '100%' }}
                                                    value={content.config?.contentUrl || ''} 
                                                    onChange={(e) => updateSheetConfig('contentUrl', e.target.value)} 
                                                    placeholder="URL pública da aba Conteúdo (CSV)"
                                                />
                                            </div>
                                            
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                                <label style={{ fontSize: '0.65rem', opacity: 0.6, fontWeight: '700' }}>COLEÇÕES/CATEGORIAS (CSV)</label>
                                                <input 
                                                    type="text" 
                                                    className="form-input" 
                                                    style={{ padding: '8px', fontSize: '0.75rem', borderRadius: '8px', width: '100%' }}
                                                    value={content.config?.categoriesUrl || ''} 
                                                    onChange={(e) => updateSheetConfig('categoriesUrl', e.target.value)} 
                                                    placeholder="URL pública da aba Categorias (CSV)"
                                                />
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                                <label style={{ fontSize: '0.65rem', opacity: 0.6, fontWeight: '700' }}>PRODUTOS (CSV)</label>
                                                <input 
                                                    type="text" 
                                                    className="form-input" 
                                                    style={{ padding: '8px', fontSize: '0.75rem', borderRadius: '8px', width: '100%' }}
                                                    value={content.config?.productsUrl || ''} 
                                                    onChange={(e) => updateSheetConfig('productsUrl', e.target.value)} 
                                                    placeholder="URL pública da aba Produtos (CSV)"
                                                />
                                            </div>
                                            
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                                <label style={{ fontSize: '0.65rem', opacity: 0.6, fontWeight: '700' }}>APPS SCRIPT URL (POST)</label>
                                                <input 
                                                    type="text" 
                                                    className="form-input" 
                                                    style={{ padding: '8px', fontSize: '0.75rem', borderRadius: '8px', width: '100%' }}
                                                    value={content.config?.scriptUrl || ''} 
                                                    onChange={(e) => updateSheetConfig('scriptUrl', e.target.value)} 
                                                    placeholder="URL do Web App do Apps Script"
                                                />
                                            </div>
                                            <p style={{ fontSize: '0.6rem', opacity: 0.5, lineHeight: '1.3' }}>
                                                Nota: As planilhas do Google devem ser publicadas na web como "Valores separados por vírgula (.csv)".
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Backup de Código JS */}
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.65rem', opacity: 0.6, textAlign: 'left', fontWeight: 'bold' }}>BACKUP MOCK (JS)</span>
                            <button className="btn-outline" onClick={handleExport} style={{ fontSize: '0.75rem', justifyContent: 'center' }}>
                                Baixar storeConfig.js
                            </button>

                            <button className="btn-outline" onClick={copyToClipboard} style={{ fontSize: '0.75rem', justifyContent: 'center' }}>
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                {copied ? 'Copiado!' : 'Copiar Config JS'}
                            </button>
                        </div>

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem' }}>
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
