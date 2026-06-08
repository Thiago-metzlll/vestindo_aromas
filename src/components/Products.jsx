import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { storeConfig } from '../data/storeConfig';
import EditableText from './EditableText';
import EditableImage from './EditableImage';
import { ShoppingBag, Plus, X, Search } from 'lucide-react';

const Products = () => {
    const { 
        tempConfig, 
        isAdmin, 
        updateProduct, 
        addProduct, 
        deleteProduct,
        activeCategoryTab,
        setActiveCategoryTab
    } = useAdmin();
    const config = tempConfig || storeConfig;
    const categories = config.categories || [];
    const products = config.products || [];

    const activeTab = activeCategoryTab !== null ? activeCategoryTab : (categories[0]?.id ?? null);
    const setActiveTab = setActiveCategoryTab;

    const [searchQuery, setSearchQuery] = useState('');

    // Normaliza categoryId para comparação segura
    const normalize = (val) => String(val ?? '').trim();

    const filteredProducts = products.filter(p => {
        const matchesQuery = searchQuery.trim() === '' || 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (searchQuery.trim() !== '') {
            return matchesQuery;
        }
        
        return normalize(p.categoryId) === normalize(activeTab) && matchesQuery;
    });

    const getProductCategoryTitle = (product) => {
        const cat = categories.find(c => normalize(c.id) === normalize(product.categoryId));
        return cat ? cat.title : '';
    };

    const activeCategory = categories.find(c => normalize(c.id) === normalize(activeTab));
    
    // Calcula o número do WhatsApp dinamicamente a partir do telefone de contato para evitar descompasso
    const rawPhone = config.contact?.phone || '';
    const cleanPhone = rawPhone.replace(/\D/g, '');
    const whatsapp = (cleanPhone.length === 10 || cleanPhone.length === 11) ? ('55' + cleanPhone) : cleanPhone;

    return (
        <section id="catalogo" style={{ padding: '120px 0', background: 'var(--bg-secondary)' }}>
            <div className="container">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <span style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        color: 'var(--secondary-accent)',
                        fontWeight: '700',
                        marginBottom: '1rem'
                    }}>
                        Nosso Catálogo
                    </span>
                    <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
                        Descubra Cada Peça
                    </h2>
                    <p style={{ opacity: 0.5, maxWidth: '500px', margin: '0 auto 2rem' }}>
                        Navegue pelas categorias e encontre o produto ideal para você.
                    </p>

                    {/* Search Bar */}
                    <div style={{
                        position: 'relative',
                        maxWidth: '500px',
                        margin: '0 auto 2rem',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <input
                            id="product-search-input"
                            type="text"
                            placeholder="Buscar produtos ou fragrâncias..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.9rem 1.2rem 0.9rem 3rem',
                                borderRadius: '50px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: 'white',
                                outline: 'none',
                                transition: 'all 0.3s',
                                fontSize: '0.95rem',
                                fontFamily: 'var(--font-body)'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = 'var(--secondary-accent)';
                                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                e.target.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                        <Search
                            size={18}
                            style={{
                                position: 'absolute',
                                left: '1.2rem',
                                opacity: 0.5,
                                color: 'white',
                                pointerEvents: 'none'
                            }}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                style={{
                                    position: 'absolute',
                                    right: '1.2rem',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    opacity: 0.5,
                                    cursor: 'pointer',
                                    padding: 0,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Search query feedback */}
                {searchQuery.trim() !== '' && (
                    <div style={{ textAlign: 'center', marginBottom: '3rem', opacity: 0.7 }}>
                        <p>Mostrando resultados para a busca por: <strong>{searchQuery}</strong></p>
                        <button 
                            onClick={() => setSearchQuery('')}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--secondary-accent)',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                marginTop: '0.5rem',
                                fontSize: '0.9rem',
                                fontFamily: 'var(--font-body)'
                            }}
                        >
                            Limpar busca e ver categorias
                        </button>
                    </div>
                )}

                {/* Category Tabs */}
                <div style={{
                    display: searchQuery.trim() !== '' ? 'none' : 'flex',
                    gap: '0.75rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '4rem'
                }}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            style={{
                                padding: '0.7rem 2rem',
                                borderRadius: '50px',
                                border: normalize(cat.id) === normalize(activeTab)
                                    ? '1px solid var(--secondary-accent)'
                                    : '1px solid rgba(255,255,255,0.1)',
                                background: normalize(cat.id) === normalize(activeTab)
                                    ? 'var(--secondary-accent)'
                                    : 'transparent',
                                color: normalize(cat.id) === normalize(activeTab) ? '#000' : 'inherit',
                                fontWeight: normalize(cat.id) === normalize(activeTab) ? '700' : '500',
                                fontSize: '0.85rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                fontFamily: 'var(--font-body)'
                            }}
                        >
                            {cat.title}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={searchQuery.trim() !== '' ? 'search-results' : activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35 }}
                        className="products-grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                            gap: '2rem'
                        }}
                    >
                        {filteredProducts.map(product => (
                            <motion.div
                                key={product.id}
                                className="glass-card"
                                whileHover={{ y: -6 }}
                                style={{
                                    padding: 0,
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    borderRadius: '20px'
                                }}
                            >
                                {/* Delete button */}
                                {isAdmin && (
                                    <button
                                        onClick={() => deleteProduct(product.id)}
                                        style={{
                                            position: 'absolute',
                                            top: '12px',
                                            right: '12px',
                                            zIndex: 30,
                                            background: '#ef4444',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '28px',
                                            height: '28px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                                        }}
                                        title="Remover produto"
                                    >
                                        <X size={14} />
                                    </button>
                                )}

                                {/* Image */}
                                <div style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
                                    <EditableImage
                                        src={product.image}
                                        alt={product.name}
                                        isEditing={isAdmin}
                                        onSave={(val) => updateProduct(product.id, 'image', val)}
                                        className="hover-zoom"
                                    />
                                </div>

                                {/* Info */}
                                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                                    {/* Category chip */}
                                    <span style={{
                                        fontSize: '0.65rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        color: 'var(--secondary-accent)',
                                        fontWeight: '700'
                                    }}>
                                        {getProductCategoryTitle(product)}
                                    </span>

                                    {/* Name */}
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', lineHeight: 1.2 }}>
                                        <EditableText
                                            value={product.name}
                                            onSave={(val) => updateProduct(product.id, 'name', val)}
                                        />
                                    </h3>

                                    {/* Description */}
                                    <p style={{ fontSize: '0.85rem', opacity: 0.6, lineHeight: 1.5, flex: 1 }}>
                                        <EditableText
                                            tagName="span"
                                            value={product.description}
                                            onSave={(val) => updateProduct(product.id, 'description', val)}
                                        />
                                    </p>

                                    {/* Price + CTA */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginTop: '1rem',
                                        paddingTop: '1rem',
                                        borderTop: '1px solid rgba(255,255,255,0.07)'
                                    }}>
                                        <p style={{
                                            fontFamily: 'var(--font-heading)',
                                            fontSize: '1.4rem',
                                            color: 'var(--secondary-accent)',
                                            fontWeight: '700'
                                        }}>
                                            <EditableText
                                                value={product.price}
                                                onSave={(val) => updateProduct(product.id, 'price', val)}
                                            />
                                        </p>

                                        {!isAdmin && (
                                            <a
                                                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Olá! Tenho interesse no produto *${product.name}* (${product.price}) do site Vestindo Aromas.`)}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    background: 'linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #be185d 100%)',
                                                    color: 'white',
                                                    padding: '0.55rem 1.1rem',
                                                    borderRadius: '50px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '700',
                                                    textDecoration: 'none',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px',
                                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                                }}
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(236,72,153,0.4)';
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            >
                                                Comprar
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Add product card — admin only */}
                        {isAdmin && (
                            <motion.button
                                onClick={() => addProduct(activeTab)}
                                whileHover={{ y: -6 }}
                                className="glass-card"
                                style={{
                                    minHeight: '420px',
                                    border: '1px dashed var(--secondary-accent)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    cursor: 'pointer',
                                    color: 'var(--secondary-accent)',
                                    background: 'rgba(212,175,55,0.03)',
                                    borderRadius: '20px',
                                    padding: '2rem'
                                }}
                            >
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    border: '1px dashed var(--secondary-accent)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Plus size={24} />
                                </div>
                                <span style={{
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    fontWeight: '700'
                                }}>
                                    Adicionar Produto
                                </span>
                                <span style={{ fontSize: '0.7rem', opacity: 0.5, textAlign: 'center' }}>
                                    em {activeCategory?.title}
                                </span>
                            </motion.button>
                        )}

                        {/* Empty state — no products and not admin */}
                        {filteredProducts.length === 0 && !isAdmin && (
                            <div style={{
                                gridColumn: '1 / -1',
                                textAlign: 'center',
                                padding: '5rem 0',
                                opacity: 0.4
                            }}>
                                <ShoppingBag size={48} style={{ margin: '0 auto 1rem' }} />
                                <p>
                                    {searchQuery.trim() !== '' 
                                        ? `Nenhum produto encontrado para "${searchQuery}".` 
                                        : "Nenhum produto disponível nesta categoria no momento."}
                                </p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Products;
