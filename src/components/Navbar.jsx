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
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Menu className="mobile-only" size={24} />
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        <EditableText
                            value={config.name}
                            onSave={(val) => handleUpdate('name', val)}
                        />
                    </h1>
                </div>

                <div className="desktop-only" style={{ display: 'flex', gap: '3rem', fontSize: '0.9rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <a href="#inicio" className="nav-link">Início</a>
                    <a href="#colecoes" className="nav-link">Coleções</a>
                    <a href="#catalogo" className="nav-link">Catálogo</a>
                    <a href="#sobre" className="nav-link">Sobre</a>
                    <a href="#contato" className="nav-link">Contato</a>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Search size={20} style={{ cursor: 'pointer', opacity: 0.7 }} />
                    <ShoppingBag size={20} style={{ cursor: 'pointer', opacity: 0.7 }} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
