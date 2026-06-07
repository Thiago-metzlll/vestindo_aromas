import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { storeConfig } from '../data/storeConfig';
import EditableText from './EditableText';
import EditableImage from './EditableImage';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
    const { tempConfig, updateConfig, isAdmin } = useAdmin();
    const config = tempConfig || storeConfig;
    const { hero } = config;

    const handleHeroUpdate = (field, value) => {
        const newConfig = { ...config };
        newConfig.hero = { ...newConfig.hero, [field]: value };
        updateConfig(newConfig);
    };

    return (
        <section id="inicio" style={{
            height: '100vh',
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            overflow: 'hidden'
        }}>
            {/* Background Image with Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -2,
                transform: 'scale(1.05)'
            }}>
                <EditableImage
                    src={hero.bgImage}
                    alt="Background Hero"
                    isEditing={isAdmin}
                    onSave={(val) => handleHeroUpdate('bgImage', val)}
                    className="hover-zoom"
                />
            </div>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)',
                zIndex: -1
            }} />

            <div className="container" style={{ zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: '300',
                        maxWidth: '900px',
                        margin: '0 auto 1.5rem',
                        lineHeight: 1.1,
                        letterSpacing: '-1px'
                    }}>
                        <EditableText
                            value={hero.title}
                            onSave={(val) => handleHeroUpdate('title', val)}
                        />
                    </h2>

                    <p style={{
                        fontSize: '1.2rem',
                        maxWidth: '600px',
                        margin: '0 auto 3rem',
                        opacity: 0.8,
                        lineHeight: 1.6
                    }}>
                        <EditableText
                            value={hero.subtitle}
                            onSave={(val) => handleHeroUpdate('subtitle', val)}
                        />
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <button className="btn-primary" style={{ padding: '1.2rem 2.5rem', borderRadius: '50px' }} onClick={() => { const el = document.getElementById('catalogo'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>
                            <EditableText
                                value={hero.cta}
                                onSave={(val) => handleHeroUpdate('cta', val)}
                            />
                        </button>
                    </div>
                </motion.div>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }}
            >
                <ChevronDown size={32} />
            </motion.div>
        </section>
    );
};

export default Hero;
