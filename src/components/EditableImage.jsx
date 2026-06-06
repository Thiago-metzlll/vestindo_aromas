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
        <div className={`relative group ${containerClassName}`} style={{ width: '100%', height: '100%' }}>
            {src ? (
                <img 
                    src={src} 
                    alt={alt} 
                    className={`${className} transition-all duration-300 ${showInput ? 'blur-sm' : ''}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            ) : (
                <div className={`${className} bg-white/5 border border-dashed border-white/20 flex items-center justify-center min-h-[150px] text-gray-500 font-body text-xs uppercase`}>
                    Sem imagem
                </div>
            )}
            
            <div 
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                    e.stopPropagation();
                    setShowInput(true);
                }}
            >
                <div
                    className="bg-[var(--secondary-accent)] text-black p-4 rounded-full shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
                    title="Alterar imagem"
                >
                    <Upload size={18} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Alterar</span>
                </div>
            </div>

            {showInput && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                    <div 
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
                        onClick={() => setShowInput(false)}
                    />
                    
                    <div 
                        className="relative glass-card p-6 shadow-2xl w-full max-w-md border border-[var(--secondary-accent)] animate-in fade-in zoom-in duration-200"
                        style={{ background: 'rgba(15, 15, 15, 0.95)', color: 'white' }}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h3 style={{ color: 'var(--secondary-accent)', fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 'bold' }}>
                                Alterar Imagem
                            </h3>
                            <button 
                                onClick={() => setShowInput(false)} 
                                style={{ background: 'none', border: 'none', color: '#a0a0a0', cursor: 'pointer' }}
                                className="hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-2 mb-6" style={{ background: 'rgba(255,255,255,0.02)', padding: '4px', borderRadius: '8px' }}>
                            <button
                                onClick={() => setTab('url')}
                                className="flex-1 text-xs py-2 rounded font-body uppercase transition-all"
                                style={{
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
                                className="flex-1 text-xs py-2 rounded font-body uppercase transition-all"
                                style={{
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
                            <div className="space-y-4">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '0.7rem', color: '#a0a0a0', textTransform: 'uppercase', letterSpacing: '1px' }}>Cole a URL da imagem aqui</label>
                                    <input
                                        type="text"
                                        placeholder="https://exemplo.com/imagem.jpg"
                                        value={urlInput}
                                        onChange={(e) => setUrlInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleUrlSave()}
                                        className="form-input"
                                        style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)' }}
                                        autoFocus
                                    />
                                </div>
                                <button
                                    onClick={handleUrlSave}
                                    className="btn-primary w-full"
                                    style={{ marginTop: '1.5rem', width: '100%' }}
                                >
                                    Salvar Alteração
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <label
                                    htmlFor="file-upload"
                                    className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 p-10 rounded-lg cursor-pointer hover:border-[var(--secondary-accent)] hover:bg-white/5 transition-all"
                                    style={{ borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.2)' }}
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
                                <p style={{ fontSize: '0.65rem', color: 'var(--secondary-accent)', textAlign: 'center', marginTop: '10px' }}>
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
