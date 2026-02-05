import React from 'react';
import { AdminProvider } from './context/AdminContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collections from './components/Collections';
import About from './components/About';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import './styles/globals.css';

function App() {
    return (
        <AdminProvider>
            <div className="app">
                <Navbar />
                <main>
                    <Hero />
                    <Collections />
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
        </AdminProvider>
    );
}

export default App;
