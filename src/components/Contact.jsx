import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { storeConfig } from '../data/storeConfig';
import EditableText from './EditableText';
import { Phone, Mail, MapPin, Instagram, ArrowRight, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
    const { tempConfig, updateConfig } = useAdmin();
    const config = tempConfig || storeConfig;
    const { contact } = config;

    // Estado do formulário
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error

    const handleContactUpdate = (field, value) => {
        const newConfig = { ...config };
        newConfig.contact = { ...newConfig.contact, [field]: value };
        updateConfig(newConfig);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleWhatsAppClick = () => {
        const message = `Olá! Vim através do site Vestindo Aromas.`;
        window.open(contact.whatsapp + `?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_KEY,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: `Nova mensagem do site - ${formData.name}`
                })
            });

            const result = await response.json();

            if (result.success) {
                setFormStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setFormStatus('idle'), 5000);
            } else {
                setFormStatus('error');
                setTimeout(() => setFormStatus('idle'), 5000);
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            setFormStatus('error');
            setTimeout(() => setFormStatus('idle'), 5000);
        }
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

                            {/* Botão Flutuante de WhatsApp */}
                            <button
                                onClick={handleWhatsAppClick}
                                className="btn-primary"
                                style={{
                                    gap: '10px',
                                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                                    marginTop: '1rem'
                                }}
                            >
                                <MessageCircle size={20} />
                                Fale no WhatsApp
                            </button>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '4rem' }}>
                        <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Envie uma mensagem</h3>

                        {formStatus === 'success' && (
                            <div style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                background: 'rgba(34, 197, 94, 0.1)',
                                border: '1px solid rgba(34, 197, 94, 0.3)',
                                color: '#22c55e',
                                marginBottom: '1.5rem',
                                textAlign: 'center'
                            }}>
                                ✓ Mensagem enviada com sucesso! Retornaremos em breve.
                            </div>
                        )}

                        {formStatus === 'error' && (
                            <div style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                color: '#ef4444',
                                marginBottom: '1.5rem',
                                textAlign: 'center'
                            }}>
                                ✗ Erro ao enviar mensagem. Tente novamente ou use o WhatsApp.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome completo"
                                className="form-input"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                disabled={formStatus === 'sending'}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail profissional"
                                className="form-input"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                disabled={formStatus === 'sending'}
                            />
                            <textarea
                                name="message"
                                placeholder="Como podemos ajudar?"
                                className="form-input"
                                style={{ minHeight: '150px' }}
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                disabled={formStatus === 'sending'}
                            />
                            <button
                                type="submit"
                                className="btn-primary"
                                style={{ marginTop: '1rem', width: '100%', justifyContent: 'space-between' }}
                                disabled={formStatus === 'sending'}
                            >
                                {formStatus === 'sending' ? 'Enviando...' : 'Enviar Mensagem'}
                                {formStatus === 'sending' ? <Send size={20} className="spinner" /> : <ArrowRight size={20} />}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
