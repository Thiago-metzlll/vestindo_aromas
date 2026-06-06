import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { storeConfig } from '../data/storeConfig';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

const Collections = () => {
    const { tempConfig, updateConfig, isAdmin, addCategory, deleteCategory, setActiveCategoryTab } = useAdmin();
    const config = tempConfig || storeConfig;
    const { categories } = config;

    const handleCategoryUpdate = (id, field, value) => {
        const newCategories = categories.map(cat =>
            cat.id === id ? { ...cat, [field]: value } : cat
        );
        updateConfig({ ...config, categories: newCategories });
    };

    const handleCategoryClick = (id) => {
        setActiveCategoryTab(id);
        const element = document.getElementById('catalogo');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="colecoes" style={{ padding: '120px 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Nossas Coleções</h2>
                    <p style={{ opacity: 0.6, maxWidth: '600px', margin: '0 auto' }}>Curadoria exclusiva das melhores marcas e fragrâncias do mundo.</p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            className="glass-card"
                            whileHover={{ y: -10 }}
                            style={{
                                padding: '0',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                cursor: 'pointer'
                            }}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            {/* Botão para deletar coleção */}
                            {isAdmin && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteCategory(category.id);
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '15px',
                                        right: '15px',
                                        zIndex: 20,
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
                                        fontWeight: 'bold',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                                    }}
                                    title="Remover Coleção"
                                >
                                    &times;
                                </button>
                            )}

                            <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
                                <EditableImage
                                    src={category.image}
                                    alt={category.title}
                                    isEditing={isAdmin}
                                    onSave={(val) => handleCategoryUpdate(category.id, 'image', val)}
                                    className="hover-zoom"
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    padding: '2rem',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                                    pointerEvents: 'none'
                                }}>
                                    <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', pointerEvents: 'auto' }}>
                                        <EditableText
                                            value={category.title}
                                            onSave={(val) => handleCategoryUpdate(category.id, 'title', val)}
                                        />
                                    </h3>
                                    <p style={{ opacity: 0.8, fontSize: '0.9rem', pointerEvents: 'auto' }}>
                                        <EditableText
                                            value={category.description}
                                            onSave={(val) => handleCategoryUpdate(category.id, 'description', val)}
                                        />
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Botão de adicionar nova coleção */}
                    {isAdmin && (
                        <button
                            onClick={addCategory}
                            className="glass-card"
                            style={{
                                minHeight: '400px',
                                border: '1px dashed var(--secondary-accent)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '15px',
                                cursor: 'pointer',
                                color: 'var(--secondary-accent)',
                                background: 'rgba(255,255,255,0.01)',
                                transition: 'all 0.3s',
                                borderRadius: '24px'
                            }}
                        >
                            <span style={{ fontSize: '3rem', fontWeight: '100' }}>+</span>
                            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>
                                Adicionar Coleção
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Collections;
