import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { storeConfig } from '../data/storeConfig';
import EditableText from './EditableText';
import { ShoppingBag, Search, Menu } from 'lucide-react';

const Navbar = () => {
    const { tempConfig, updateConfig } = useAdmin();
    const config = tempConfig || storeConfig;

    const handleUpdate = (field, value) => {
        updateConfig({ ...config, [field]: value });
    };

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            padding: '1.5rem 0',
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(20px)',
            zIndex: 1000,
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <Menu className="mobile-only" size={24} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <img 
                            src="/logo.png" 
                            alt={`${config.name} Logo`} 
                            style={{ 
                                width: '36px', 
                                height: '36px', 
                                borderRadius: '50%', 
                                objectFit: 'cover',
                                border: '1.5px solid var(--secondary-accent, #D4AF37)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                            }} 
                        />
                        <h1 style={{ fontSize: '1.35rem', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>
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

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Search 
                        size={20} 
                        style={{ cursor: 'pointer', opacity: 0.7 }} 
                        onClick={() => {
                            const searchInput = document.getElementById('product-search-input');
                            if (searchInput) {
                                searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                searchInput.focus();
                            } else {
                                const catalog = document.getElementById('catalogo');
                                if (catalog) {
                                    catalog.scrollIntoView({ behavior: 'smooth' });
                                }
                            }
                        }}
                    />
                    <ShoppingBag 
                        size={20} 
                        style={{ cursor: 'pointer', opacity: 0.7 }} 
                        onClick={() => {
                            const catalog = document.getElementById('catalogo');
                            if (catalog) {
                                catalog.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
