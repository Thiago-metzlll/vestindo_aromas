import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { storeConfig } from '../data/storeConfig';
import EditableText from './EditableText';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';

const byPrefixAndName = {
    fab: {
        whatsapp: faWhatsapp,
        instagram: faInstagram
    }
};

const Contact = () => {
    const { tempConfig, updateConfig } = useAdmin();
    const config = tempConfig || storeConfig;
    const { contact } = config;

    const handleContactUpdate = (field, value) => {
        const newConfig = { ...config };
        newConfig.contact = { ...newConfig.contact, [field]: value };

        if (field === 'phone') {
            const cleanNumber = value.replace(/\D/g, '');
            if (cleanNumber) {
                let targetNumber = cleanNumber;
                if (cleanNumber.length === 10 || cleanNumber.length === 11) {
                    targetNumber = '55' + cleanNumber;
                }
                newConfig.contact.whatsapp = `https://wa.me/${targetNumber}`;
            }
        }

        updateConfig(newConfig);
    };

    const handleWhatsAppClick = () => {
        const rawPhone = contact.phone || '';
        const cleanPhone = rawPhone.replace(/\D/g, '');
        const targetNumber = (cleanPhone.length === 10 || cleanPhone.length === 11) ? ('55' + cleanPhone) : cleanPhone;
        const message = `Olá! Vim através do site Vestindo Aromas.`;
        window.open(`https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleInstagramClick = () => {
        const handle = (contact.instagram || '').replace('@', '').trim();
        if (handle) {
            window.open(`https://instagram.com/${handle}`, '_blank');
        }
    };

    return (
        <section id="contato" style={{ padding: '120px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="container">
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    <div className="glass-card" style={{
                        padding: '4rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '-50%',
                            right: '-50%',
                            width: '200px',
                            height: '200px',
                            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                            pointerEvents: 'none',
                            zIndex: 0
                        }} />

                        <div style={{ position: 'relative', zIndex: 1, width: '100%', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'var(--font-heading)' }}>
                                Contato
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }}>
                                <button
                                    onClick={handleWhatsAppClick}
                                    className="btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '1.2rem',
                                        fontSize: '1rem',
                                        background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '12px',
                                        fontWeight: 600,
                                        transition: 'transform 0.2s, box-shadow 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 211, 102, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <FontAwesomeIcon icon={byPrefixAndName.fab['whatsapp']} size="lg" />
                                    Conversar pelo WhatsApp
                                </button>

                                <button
                                    onClick={handleInstagramClick}
                                    className="btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '1.2rem',
                                        fontSize: '1rem',
                                        background: 'linear-gradient(135deg, #C13584 0%, #E1306C 50%, #F77737 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '12px',
                                        fontWeight: 600,
                                        transition: 'transform 0.2s, box-shadow 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(225, 48, 108, 0.25)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <FontAwesomeIcon icon={byPrefixAndName.fab['instagram']} size="lg" />
                                    Seguir no Instagram
                                </button>
                            </div>

                            <div style={{
                                marginTop: '2.5rem',
                                paddingTop: '2.5rem',
                                borderTop: '1px solid rgba(255,255,255,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                alignItems: 'center'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6, fontSize: '0.95rem' }}>
                                    <Mail size={16} />
                                    <EditableText
                                        value={contact.email}
                                        onSave={(val) => handleContactUpdate('email', val)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6, fontSize: '0.95rem' }}>
                                    <MapPin size={16} />
                                    <EditableText
                                        value={contact.address}
                                        onSave={(val) => handleContactUpdate('address', val)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
