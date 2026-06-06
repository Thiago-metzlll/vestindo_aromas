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
            <footer style={{ padding: '3rem 0', textAlign: 'center', opacity: 0.5, fontSize: '0.8rem' }}>
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Vestindo Aromas. Todos os direitos reservados.</p>
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
