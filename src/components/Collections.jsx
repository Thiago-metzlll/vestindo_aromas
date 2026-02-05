import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { storeConfig } from '../data/storeConfig';
import EditableText from './EditableText';

const Collections = () => {
    const { tempConfig, updateConfig } = useAdmin();
    const config = tempConfig || storeConfig;
    const { categories } = config;

    const handleCategoryUpdate = (id, field, value) => {
        const newCategories = categories.map(cat =>
            cat.id === id ? { ...cat, [field]: value } : cat
        );
        updateConfig({ ...config, categories: newCategories });
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
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                    className="hover-zoom"
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    padding: '2rem',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
                                }}>
                                    <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                                        <EditableText
                                            value={category.title}
                                            onSave={(val) => handleCategoryUpdate(category.id, 'title', val)}
                                        />
                                    </h3>
                                    <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                                        <EditableText
                                            value={category.description}
                                            onSave={(val) => handleCategoryUpdate(category.id, 'description', val)}
                                        />
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Collections;
