import { useState } from 'react';

import { motion } from 'framer-motion';
import { User as UserIcon, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';
import styles from './Login.module.css';
import logo from '../img/logo.jpg';
import logosf from '../img/logosf.png';
import { authUtils } from '../utils/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8091';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                username,
                password
            });

            const token = response.data.token || response.data.access_token;

            if (token) {
                console.log('Login: Success, saving session and redirecting...');
                authUtils.saveSession(token, username);
                window.location.href = '/dashboard'; // Use href for a clean state reload
            } else {
                throw new Error('No se recibio token');
            }
        } catch (err: any) {
            console.error('Login Error:', err);
            alert('Error en login: ' + (err.response?.data?.error || err.message));
            setError('Credenciales invalidas o error en el servidor. Verifique e intente nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.blob} ${styles.blob1}`} />
            <div className={`${styles.blob} ${styles.blob2}`} />

            <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "out" }}
            >
                <div className={styles.imageSection}>
                    <motion.img
                        src={logo}
                        alt="Logo"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    />
                    <motion.img
                        src={logosf}
                        alt="Logo sf"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    />
                </div>

                <div className={styles.formSection}>
                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Bienvenido a la prueba de PRISMA_59
                    </motion.h1>
                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Se requiere autenticación para acceder a los tableros
                    </motion.p>

                    {error && (
                        <motion.div
                            className={styles.error}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                        >
                            <AlertCircle size={18} />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className={styles.formGroup}>
                            <div className={styles.inputWrapper}>
                                <UserIcon className={styles.icon} size={20} />
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Usuario"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <div className={styles.inputWrapper}>
                                <Lock className={styles.icon} size={20} />
                                <input
                                    type="password"
                                    className={styles.input}
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            className={styles.button}
                            disabled={isLoading}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" style={{ margin: '0 auto' }} />
                            ) : (
                                <>
                                    Iniciar Sesión <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className={styles.footer}>
                        ¿No tienes una cuenta?
                        <a href="#" className={styles.link}>Registrarse</a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
