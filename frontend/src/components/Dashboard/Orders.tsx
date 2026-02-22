import { ShoppingBag, CheckCircle, Clock } from 'lucide-react';
import styles from './Dashboard.module.css';

export default function Orders() {
    const orders = [
        { id: '#ORD-7721', customer: 'Elena García', date: '21 Feb, 2026', total: '$124.50', status: 'Entregado' },
        { id: '#ORD-7722', customer: 'Marcos Ruiz', date: '20 Feb, 2026', total: '$45.00', status: 'Pendiente' },
        { id: '#ORD-7723', customer: 'Sofía López', date: '19 Feb, 2026', total: '$210.30', status: 'Entregado' },
    ];

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Gestión de Pedidos</h1>
            </div>

            <div className={styles.card}>
                <table className={styles.tableContainer}>
                    <thead>
                        <tr>
                            <th className={styles.th}>ID Pedido</th>
                            <th className={styles.th}>Cliente</th>
                            <th className={styles.th}>Fecha</th>
                            <th className={styles.th}>Total</th>
                            <th className={styles.th}>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className={styles.tr}>
                                <td className={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <ShoppingBag size={18} color="#d81b60" />
                                        {order.id}
                                    </div>
                                </td>
                                <td className={styles.td}>{order.customer}</td>
                                <td className={styles.td}>{order.date}</td>
                                <td className={styles.td} style={{ fontWeight: 600 }}>{order.total}</td>
                                <td className={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        {order.status === 'Entregado' ?
                                            <CheckCircle size={14} color="#2e7d32" /> :
                                            <Clock size={14} color="#ef6c00" />
                                        }
                                        <span className={`${styles.badge} ${order.status === 'Entregado' ? styles['status-active'] : styles['status-pending']
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
