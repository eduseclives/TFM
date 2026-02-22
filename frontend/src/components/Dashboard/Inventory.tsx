import { Package, Plus, Search } from 'lucide-react';
import styles from './Dashboard.module.css';

export default function Inventory() {
    const products = [
        { id: 1, name: 'Sérum Facial Vitamina C', category: 'Cuidado Facial', price: '$25.00', stock: 45, status: 'Disponible' },
        { id: 2, name: 'Base de Maquillaje Glow', category: 'Maquillaje', price: '$32.00', stock: 12, status: 'Bajo Stock' },
        { id: 3, name: 'Crema Hidratante Bio', category: 'Cuidado Facial', price: '$18.50', stock: 0, status: 'Agotado' },
        { id: 4, name: 'Labial Matte Rose', category: 'Labiales', price: '$15.00', stock: 88, status: 'Disponible' },
    ];

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Inventario de Productos</h1>
                <button className={styles.addButton}>
                    <Plus size={20} /> Añadir Producto
                </button>
            </div>

            <div className={styles.card}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        background: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid #fce4ec'
                    }}>
                        <Search size={18} color="#ad1457" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            style={{ border: 'none', outline: 'none', paddingLeft: '10px', width: '100%' }}
                        />
                    </div>
                </div>

                <table className={styles.tableContainer}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Producto</th>
                            <th className={styles.th}>Categoría</th>
                            <th className={styles.th}>Precio</th>
                            <th className={styles.th}>Stock</th>
                            <th className={styles.th}>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className={styles.tr}>
                                <td className={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ background: '#fce4ec', padding: '8px', borderRadius: '8px' }}>
                                            <Package size={18} color="#d81b60" />
                                        </div>
                                        <strong>{product.name}</strong>
                                    </div>
                                </td>
                                <td className={styles.td}>{product.category}</td>
                                <td className={styles.td}>{product.price}</td>
                                <td className={styles.td}>{product.stock}</td>
                                <td className={styles.td}>
                                    <span className={`${styles.badge} ${product.status === 'Disponible' ? styles['status-active'] : styles['status-pending']
                                        }`}>
                                        {product.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
