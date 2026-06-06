import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { storeConfig } from '../data/storeConfig';
import EditableText from './EditableText';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const byPrefixAndName = {
    fab: {
        whatsapp: faWhatsapp
    }
};

const Contact = () => {
    const { tempConfig, updateConfig } = useAdmin();
    const config = tempConfig || storeConfig;
    const { contact } = config;

    const handleContactUpdate = (field, value) => {
        const newConfig = { ...config };
        newConfig.contact = { ...newConfig.contact, [field]: value };
        updateConfig(newConfig);
    };

    const handleWhatsAppClick = () => {
        const message = `Olá! Vim através do site Vestindo Aromas.`;
        window.open(contact.whatsapp + `?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <section id="contato" style={{ padding: '120px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '6rem',
                    alignItems: 'start'
                }}>
                    <div>
                        <h2 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-heading)', marginBottom: '2rem' }}>Fale Conosco</h2>
                        <p style={{ fontSize: '1.2rem', opacity: 0.6, marginBottom: '4rem', lineHeight: '1.6' }}>
                            Visite nossa loja física ou entre em contato para pedidos personalizados e consultoria de imagem.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div className="icon-circle"><Phone size={22} /></div>
                                <div>
                                    <p className="contact-label">Telefone / WhatsApp</p>
                                    <EditableText
                                        className="contact-value"
                                        value={contact.phone}
                                        onSave={(val) => handleContactUpdate('phone', val)}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div className="icon-circle"><Mail size={22} /></div>
                                <div>
                                    <p className="contact-label">E-mail</p>
                                    <EditableText
                                        className="contact-value"
                                        value={contact.email}
                                        onSave={(val) => handleContactUpdate('email', val)}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div className="icon-circle"><Instagram size={22} /></div>
                                <div>
                                    <p className="contact-label">Instagram</p>
                                    <EditableText
                                        className="contact-value"
                                        value={contact.instagram}
                                        onSave={(val) => handleContactUpdate('instagram', val)}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div className="icon-circle"><MapPin size={22} /></div>
                                <div>
                                    <p className="contact-label">Endereço</p>
                                    <EditableText
                                        className="contact-value"
                                        value={contact.address}
                                        onSave={(val) => handleContactUpdate('address', val)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ 
                        padding: '4rem', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'flex-start',
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

                        <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                            <span style={{ 
                                textTransform: 'uppercase', 
                                letterSpacing: '2px', 
                                fontSize: '0.85rem', 
                                color: 'rgba(255,255,255,0.5)', 
                                display: 'block', 
                                marginBottom: '1rem',
                                fontWeight: 600
                            }}>
                                Atendimento Rápido
                            </span>
                            <h3 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
                                Atendimento Exclusivo
                            </h3>
                            <p style={{ fontSize: '1.1rem', opacity: 0.7, marginBottom: '2.5rem', lineHeight: '1.6' }}>
                                Nossa equipe de consultoria está pronta para te atender de forma personalizada. Tire dúvidas sobre tamanhos, fragrâncias, disponibilidade em estoque ou solicite entrega especial.
                            </p>

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
                                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 211, 102, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <FontAwesomeIcon icon={byPrefixAndName.fab['whatsapp']} size="lg" />
                                    Conversar pelo WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
