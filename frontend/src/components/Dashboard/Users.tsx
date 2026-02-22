import { User, Shield, Mail } from 'lucide-react';
import styles from './Dashboard.module.css';

export default function Users() {
    const users = [
        { id: 1, name: 'Administrador', email: 'admin@cosmetix.com', role: 'Super Admin', lastActive: 'Ahora' },
        { id: 2, name: 'Ana Gestora', email: 'ana.v@cosmetix.com', role: 'Editor', lastActive: 'Hace 2 horas' },
        { id: 3, name: 'Vendedor Global', email: 'ventas@cosmetix.com', role: 'Ventas', lastActive: 'Ayer' },
    ];

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Administración de Usuarios</h1>
            </div>

            <div className={styles.card}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {users.map(user => (
                        <div key={user.id} style={{
                            background: 'white', // Keeping the background white for the card itself
                            borderRadius: '15px',
                            border: '1px solid #fce4ec',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ background: '#fce4ec', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={24} color="#d81b60" style={{ margin: '0 auto' }} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{user.name}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '0.85rem' }}>
                                        <Mail size={12} /> {user.email}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#ad1457', fontWeight: 500 }}>
                                    <Shield size={14} /> {user.role}
                                </div>
                                <span style={{ fontSize: '0.75rem', color: '#999' }}>Activo: {user.lastActive}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
