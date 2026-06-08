import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { storeConfig } from '../data/storeConfig';
import EditableText from './EditableText';
import { Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { tempConfig, updateConfig } = useAdmin();
    const config = tempConfig || storeConfig;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleUpdate = (field, value) => {
        updateConfig({ ...config, [field]: value });
    };

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            padding: '0.9rem 0',
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(20px)',
            zIndex: 1000,
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                    {isMobileMenuOpen ? (
                        <X 
                            className="mobile-only" 
                            size={22} 
                            style={{ flexShrink: 0, cursor: 'pointer', color: 'var(--secondary-accent)' }} 
                            onClick={() => setIsMobileMenuOpen(false)} 
                        />
                    ) : (
                        <Menu 
                            className="mobile-only" 
                            size={22} 
                            style={{ flexShrink: 0, cursor: 'pointer' }} 
                            onClick={() => setIsMobileMenuOpen(true)} 
                        />
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflow: 'hidden' }}>
                        <img 
                            src="/logo.png" 
                            alt={`${config.name} Logo`} 
                            style={{ 
                                width: '30px', 
                                height: '30px', 
                                borderRadius: '50%', 
                                objectFit: 'cover',
                                border: '1.5px solid var(--secondary-accent, #D4AF37)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                flexShrink: 0
                            }} 
                        />
                        <h1 style={{ fontSize: 'clamp(0.75rem, 3.5vw, 1.2rem)', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <EditableText
                                value={config.name}
                                onSave={(val) => handleUpdate('name', val)}
                            />
                        </h1>
                    </div>
                </div>

                <div className="desktop-only" style={{ display: 'flex', gap: '3rem', fontSize: '0.9rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <a href="#inicio" className="nav-link">Início</a>
                    <a href="#colecoes" className="nav-link">Coleções</a>
                    <a href="#catalogo" className="nav-link">Catálogo</a>
                    <a href="#sobre" className="nav-link">Sobre</a>
                    <a href="#contato" className="nav-link">Contato</a>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexShrink: 0 }}>
                    <Search 
                        size={18} 
                        style={{ cursor: 'pointer', opacity: 0.7 }} 
                        onClick={() => {
                            const searchInput = document.getElementById('product-search-input');
                            if (searchInput) {
                                searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                searchInput.focus();
                            } else {
                                const catalog = document.getElementById('catalogo');
                                if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                    />

                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{
                            overflow: 'hidden',
                            width: '100%',
                            background: 'rgba(10, 10, 10, 0.96)',
                            backdropFilter: 'blur(20px)',
                            borderBottom: '1px solid rgba(255,255,255,0.08)'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.2rem',
                            padding: '1.5rem 5%',
                            textTransform: 'uppercase',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            letterSpacing: '1px'
                        }}>
                            <a href="#inicio" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Início</a>
                            <a href="#colecoes" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Coleções</a>
                            <a href="#catalogo" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Catálogo</a>
                            <a href="#sobre" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Sobre</a>
                            <a href="#contato" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contato</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
