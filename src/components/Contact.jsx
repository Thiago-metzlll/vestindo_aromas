import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { storeConfig } from '../data/storeConfig';
import EditableText from './EditableText';
import { Phone, Mail, MapPin, Instagram, ArrowRight } from 'lucide-react';

const Contact = () => {
    const { tempConfig, updateConfig } = useAdmin();
    const config = tempConfig || storeConfig;
    const { contact } = config;

    const handleContactUpdate = (field, value) => {
        const newConfig = { ...config };
        newConfig.contact = { ...newConfig.contact, [field]: value };
        updateConfig(newConfig);
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

                    <div className="glass-card" style={{ padding: '4rem' }}>
                        <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Envie uma mensagem</h3>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <input type="text" placeholder="Nome completo" className="form-input" />
                            <input type="email" placeholder="E-mail profissional" className="form-input" />
                            <textarea placeholder="Como podemos ajudar?" className="form-input" style={{ minHeight: '150px' }}></textarea>
                            <button className="btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'space-between' }}>
                                Enviar Mensagem
                                <ArrowRight size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
