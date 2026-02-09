import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';
import styles from './Login.module.css';

// Configure Axios base URL (Gateway)
// In development, Vite proxy will handle /api calls if configured,
// but for now we point directly to localhost:8080 or use relative path if proxy is set.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Simulate network delay for "Premium" feel if local
        // await new Promise(r => setTimeout(r, 1000));

        try {
            // Assuming Gateway Gateway is configured as Resource Server, 
            // but we need to obtain token from an Auth Server.
            // We'll post to /auth/login which acts as the token endpoint.
            const response = await axios.post(`${API_URL}/auth/login`, {
                username,
                password
            });

            const token = response.data.token || response.data.access_token;

            if (token) {
                // Save token
                localStorage.setItem('jwt_token', token);
                // Animate success or redirect
                alert(`Welcome back, ${username}! Token received.`);
            } else {
                throw new Error('No token received');
            }
        } catch (err: any) {
            console.error(err);
            setError('Invalid credentials or server error. Please try again.');
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
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Welcome Back
                </motion.h1>
                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Please sign in to access your dashboard
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
                            <User className={styles.icon} size={20} />
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Username"
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
                                placeholder="Password"
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
                                Sign In <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
                            </>
                        )}
                    </motion.button>
                </form>

                <div className={styles.footer}>
                    Don't have an account?
                    <a href="#" className={styles.link}>Sign up</a>
                </div>
            </motion.div>
        </div>
    );
}
