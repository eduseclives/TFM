import styles from './Dashboard.module.css';
import { Sparkles, TrendingUp, ShoppingBag, Users as UsersIcon } from 'lucide-react';

export default function Overview() {
    const stats = [
        { label: 'Ventas Hoy', value: '$1,240', icon: <TrendingUp size={24} />, color: '#d81b60' },
        { label: 'Pedidos Nuevos', value: '12', icon: <ShoppingBag size={24} />, color: '#ad1457' },
        { label: 'Clientes', value: '850', icon: <UsersIcon size={24} />, color: '#880e4f' },
        { label: 'Artículos Top', value: '5', icon: <Sparkles size={24} />, color: '#c2185b' },
    ];

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Panel de Resumen</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {stats.map((stat, i) => (
                    <div key={i} className={styles.card} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ background: `${stat.color}15`, padding: '15px', borderRadius: '15px', color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div>
                            <div style={{ color: '#666', fontSize: '0.9rem' }}>{stat.label}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#333' }}>{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.card}>
                <h3 style={{ margin: '0 0 1.5rem 0' }}>Análisis de Tendencias</h3>
                <div style={{ height: '200px', background: 'linear-gradient(to bottom, #fff, #fce4ec)', borderRadius: '15px', display: 'flex', alignItems: 'flex-end', padding: '20px', gap: '10px' }}>
                    {[60, 40, 80, 50, 90, 70, 85].map((h, i) => (
                        <div key={i} style={{ flex: 1, height: `${h}%`, background: '#d81b60', borderRadius: '5px 5px 0 0', opacity: 0.7 + (i * 0.05) }} />
                    ))}
                </div>
            </div>
        </div>
    );
}
