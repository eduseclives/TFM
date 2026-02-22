import { NavLink, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users as UsersIcon,
    LogOut,
    Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Dashboard.module.css';
import logo from '../../img/logo.jpg';
import { authUtils } from '../../utils/auth';

export default function Dashboard() {
    const username = authUtils.getUsername() || 'Admin';

    const handleLogout = () => {
        console.log('Dashboard: Logging out...');
        authUtils.clearSession();
        window.location.href = '/'; // Hard redirect to clear all states
    };

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Resumen', path: '/dashboard' },
        { icon: <Package size={20} />, label: 'Inventario', path: '/dashboard/inventory' },
        { icon: <ShoppingCart size={20} />, label: 'Pedidos', path: '/dashboard/orders' },
        { icon: <UsersIcon size={20} />, label: 'Usuarios', path: '/dashboard/users' },
    ];

    return (
        <div className={styles.dashboardContainer}>
            <aside className={styles.sidebar}>
                <div className={styles.logoArea}>
                    <img src={logo} alt="Logo" className={styles.logo} />
                    <span className={styles.brandName}>Cosmetix</span>
                </div>

                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/dashboard'}
                            className={({ isActive }) =>
                                `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                            }
                        >
                            {item.icon}
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className={styles.userProfile}>
                    <div className={styles.avatar}>
                        <Sparkles size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{username}</div>
                        <div style={{ fontSize: '0.75rem', color: '#ad1457' }}>Administrador</div>
                    </div>
                </div>

                <button onClick={handleLogout} className={styles.navLink} style={{ marginTop: '1rem', border: 'none', background: 'none', cursor: 'pointer', width: '100%' }}>
                    <LogOut size={20} />
                    Cerrar Sesión
                </button>
            </aside>

            <main className={styles.mainContent}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
}
