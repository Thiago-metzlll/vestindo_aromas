import React, { useState } from 'react';
import { Upload, Link as LinkIcon, X } from 'lucide-react';

export default function EditableImage({
    src,
    alt,
    onSave,
    isEditing,
    className = "",
    containerClassName = ""
}) {
    const [showInput, setShowInput] = useState(false);
    const [urlInput, setUrlInput] = useState('');
    const [tab, setTab] = useState('url'); // 'url' | 'file'

    if (!isEditing) {
        return src ? <img src={src} alt={alt} className={className} /> : null;
    }

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onSave(reader.result);
                setShowInput(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUrlSave = () => {
        if (urlInput.trim()) {
            onSave(urlInput.trim());
            setUrlInput('');
            setShowInput(false);
        }
    };

    return (
        <div className={`editable-image-container ${containerClassName}`}>
            {src ? (
                <img 
                    src={src} 
                    alt={alt} 
                    className={className} 
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'all 0.3s ease',
                        filter: showInput ? 'blur(4px)' : 'none'
                    }}
                />
            ) : (
                <div 
                    className={className}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px dashed rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '150px',
                        color: '#a0a0a0',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase'
                    }}
                >
                    Sem imagem
                </div>
            )}
            
            <div 
                className="editable-image-overlay"
                onClick={(e) => {
                    e.stopPropagation();
                    setShowInput(true);
                }}
            >
                <div className="editable-image-btn" title="Alterar imagem">
                    <Upload size={18} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Alterar</span>
                </div>
            </div>

            {showInput && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 10000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <div 
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(4px)',
                            zIndex: -1
                        }}
                        onClick={() => setShowInput(false)}
                    />
                    
                    <div 
                        className="glass-card"
                        style={{ 
                            position: 'relative', 
                            padding: '2rem', 
                            width: '100%', 
                            maxWidth: '450px', 
                            border: '1px solid var(--secondary-accent)', 
                            background: 'rgba(15, 15, 15, 0.95)', 
                            color: 'white',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                            borderRadius: '24px'
                        }}
                    >
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: 'var(--secondary-accent)', fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
                                Alterar Imagem
                            </h3>
                            <button 
                                onClick={() => setShowInput(false)} 
                                style={{ background: 'none', border: 'none', color: '#a0a0a0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '4px', borderRadius: '8px' }}>
                            <button
                                onClick={() => setTab('url')}
                                style={{
                                    flex: 1,
                                    fontSize: '0.75rem',
                                    padding: '8px 0',
                                    borderRadius: '4px',
                                    fontFamily: 'var(--font-body)',
                                    textTransform: 'uppercase',
                                    transition: 'all 0.2s',
                                    background: tab === 'url' ? 'var(--secondary-accent)' : 'transparent',
                                    color: tab === 'url' ? 'black' : '#a0a0a0',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <LinkIcon size={12} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> Link da Web
                            </button>
                            <button
                                onClick={() => setTab('file')}
                                style={{
                                    flex: 1,
                                    fontSize: '0.75rem',
                                    padding: '8px 0',
                                    borderRadius: '4px',
                                    fontFamily: 'var(--font-body)',
                                    textTransform: 'uppercase',
                                    transition: 'all 0.2s',
                                    background: tab === 'file' ? 'var(--secondary-accent)' : 'transparent',
                                    color: tab === 'file' ? 'black' : '#a0a0a0',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <Upload size={12} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> Upload
                            </button>
                        </div>

                        {tab === 'url' ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '0.7rem', color: '#a0a0a0', textTransform: 'uppercase', letterSpacing: '1px' }}>Cole a URL da imagem aqui</label>
                                    <input
                                        type="text"
                                        placeholder="https://exemplo.com/imagem.jpg"
                                        value={urlInput}
                                        onChange={(e) => setUrlInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleUrlSave()}
                                        className="form-input"
                                        style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid #333', color: 'white' }}
                                        autoFocus
                                    />
                                </div>
                                <button
                                    onClick={handleUrlSave}
                                    className="btn-primary"
                                    style={{ width: '100%' }}
                                >
                                    Salvar Alteração
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <label
                                    htmlFor="file-upload"
                                    className="file-upload-label"
                                >
                                    <Upload size={36} style={{ color: '#666', marginBottom: '12px' }} />
                                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#a0a0a0' }}>Selecionar arquivo</span>
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    style={{ display: 'none' }}
                                />
                                <p style={{ fontSize: '0.65rem', color: 'var(--secondary-accent)', textAlign: 'center', marginTop: '10px', lineHeight: '1.4' }}>
                                    Nota: Uploads locais convertem a imagem para Base64. Use links da web se preferir planilhas menores.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
