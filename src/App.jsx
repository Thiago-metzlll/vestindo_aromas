import React from 'react';
import { AdminProvider, useAdmin } from './context/AdminContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collections from './components/Collections';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import './styles/globals.css';

function AppContent() {
    const { isLoading } = useAdmin();

    if (isLoading) {
        return (
            <div style={{ 
                minHeight: '100vh', 
                background: '#0a0a0a', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white',
                fontFamily: 'var(--font-body)'
            }}>
                <img 
                    src="/logo.png" 
                    alt="Vestindo Aromas Logo" 
                    style={{ 
                        width: '80px', 
                        height: '80px', 
                        borderRadius: '50%', 
                        objectFit: 'cover', 
                        marginBottom: '1.5rem',
                        border: '2px solid var(--secondary-accent, #D4AF37)',
                        boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)'
                    }} 
                />
                <h1 style={{ 
                    fontFamily: 'var(--font-heading)', 
                    color: 'var(--secondary-accent)', 
                    letterSpacing: '0.2em', 
                    textTransform: 'uppercase', 
                    fontSize: '2rem', 
                    marginBottom: '10px',
                    fontWeight: '300'
                }}>
                    Vestindo Aromas
                </h1>
                <p style={{ letterSpacing: '0.1em', fontSize: '0.8rem', opacity: 0.6 }}>Carregando conteúdo...</p>
            </div>
        );
    }

    return (
        <div className="app">
            <Navbar />
            <main>
                <Hero />
                <Collections />
                <Products />
                <About />
                <Contact />
            </main>
            <footer style={{ padding: '4rem 0 3rem', background: 'rgba(0, 0, 0, 0.2)', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', fontSize: '0.8rem' }}>
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                    <img 
                        src="/logo.png" 
                        alt="Vestindo Aromas Logo" 
                        style={{ 
                            width: '50px', 
                            height: '50px', 
                            borderRadius: '50%', 
                            objectFit: 'cover',
                            border: '1px solid rgba(255,255,255,0.1)',
                            opacity: 0.8
                        }} 
                    />
                    <p style={{ opacity: 0.5 }}>&copy; {new Date().getFullYear()} Vestindo Aromas. Todos os direitos reservados.</p>
                </div>
            </footer>

            <AdminPanel />
            <AdminLogin />
        </div>
    );
}

function App() {
    return (
        <AdminProvider>
            <AppContent />
        </AdminProvider>
    );
}

export default App;
