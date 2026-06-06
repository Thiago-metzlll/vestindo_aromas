import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { storeConfig } from '../data/storeConfig';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

const About = () => {
    const { tempConfig, updateConfig, isAdmin } = useAdmin();
    const config = tempConfig || storeConfig;
    const { about } = config;

    const handleAboutUpdate = (field, value) => {
        const newConfig = { ...config };
        newConfig.about = { ...newConfig.about, [field]: value };
        updateConfig(newConfig);
    };

    return (
        <section id="sobre" style={{ padding: '120px 0', background: 'var(--bg-secondary)' }}>
            <div className="container">
                <div className="about-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '5rem',
                    alignItems: 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div style={{
                            position: 'relative',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            aspectRatio: '1',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
                        }}>
                            <EditableImage
                                src={about.image}
                                alt="Sobre nós"
                                isEditing={isAdmin}
                                onSave={(val) => handleAboutUpdate('image', val)}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span style={{
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            fontSize: '0.8rem',
                            color: 'var(--secondary-accent)',
                            fontWeight: '700',
                            display: 'block',
                            marginBottom: '1rem'
                        }}>Essência & Estilo</span>

                        <h2 style={{ fontSize: '3rem', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>
                            <EditableText
                                value={about.title}
                                onSave={(val) => handleAboutUpdate('title', val)}
                            />
                        </h2>

                        <EditableText
                            tagName="p"
                            style={{ fontSize: '1.2rem', lineHeight: '1.8', opacity: 0.8, color: 'var(--text-muted)' }}
                            value={about.description}
                            onSave={(val) => handleAboutUpdate('description', val)}
                        />

                        <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem' }}>
                            <div>
                                <h4 style={{ fontSize: '2rem', color: 'var(--secondary-accent)' }}>10+</h4>
                                <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Anos de Luxo</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '2rem', color: 'var(--secondary-accent)' }}>500+</h4>
                                <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Fragrâncias</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '2rem', color: 'var(--secondary-accent)' }}>1k+</h4>
                                <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Clientes Felizes</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
