import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Lock, LogIn, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLogin = () => {
    const { login, isAdmin, setIsAdmin } = useAdmin();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(password);
        if (success) {
            setPassword('');
            setShowLogin(false);
            setError(false);
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    if (isAdmin) return null;

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    opacity: 0.1,
                    cursor: 'pointer',
                    zIndex: 9999
                }}
                onClick={() => {
                    if (localStorage.getItem('isAdminAuthenticated') === 'true') {
                        setIsAdmin(true);
                    } else {
                        setShowLogin(true);
                    }
                }}
                title="Admin Access"
            >
                <Lock size={14} />
            </div>

            <AnimatePresence>
                {showLogin && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0,0,0,0.8)',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10000,
                            padding: '20px'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="glass-card"
                            style={{ padding: '3rem', maxWidth: '400px', width: '100%', position: 'relative' }}
                        >
                            <button
                                onClick={() => setShowLogin(false)}
                                style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                            >
                                <X size={24} />
                            </button>

                            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Acesso Restrito</h2>

                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Senha de acesso"
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '8px',
                                            border: error ? '1px solid #f87171' : '1px solid var(--glass-border)',
                                            background: 'rgba(255,255,255,0.05)',
                                            color: 'white',
                                            outline: 'none'
                                        }}
                                    />
                                    {error && <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '5px' }}>Senha incorreta</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary"
                                    style={{ width: '100%', gap: '10px' }}
                                >
                                    <LogIn size={18} />
                                    Entrar no Painel
                                </button>


                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AdminLogin;
