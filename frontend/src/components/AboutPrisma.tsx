import { motion } from 'framer-motion';
import { ArrowLeft, Code2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './AboutPrisma.module.css';

export default function AboutPrisma() {
  return (
    <div className={styles.container}>
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />

      <div className={styles.content}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.title}>Acerca de PRISMA_59</h1>
          <p className={styles.subtitle}>
            PRISMA_59 es una metodologia de integración sistematica que integra un protocolo de 5 etapas con 9 pasos alineada con el SDLC,
            brinda un equilibrio entre la abstraccion arquitectonica y la implementacion practica. Esta metodologia permite manejar enfoque
            de desarrollo y de auditoria de manera natural, permitiendo una mejor gestion de los riesgos y una mayor transparencia
            en la gestión de los recursos.
            La metodologia inicialmente esta enfocada en ecosistemas Spring con netflix OSS, pero se puede adaptar a cualquier ecosistema
            de software en arquitecturas de microservicios.
          </p>
        </motion.div>

        <div className={styles.cardsContainer}>
          <motion.div 
            className={styles.card}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.iconWrapper}>
              <Code2 size={32} color="#a855f7" />
            </div>
            <h2 className={styles.cardTitle}>Para Desarrolladores</h2>
            <p className={styles.cardText}>
              La aplicación está construido utilizando una arquitectura moderna de microservicios con Spring Boot y un frontend responsivo en React. 
              El diseño promueve la escalabilidad y facilidad de integración.
            </p>
            <ul className={styles.cardList}>
              <li>Arquitectura de Microservicios</li>
              <li>Frontend React + Vite</li>
              <li>Comunicación vía API REST</li>
              <li>Despliegue con Docker Compose</li>
            </ul>
          </motion.div>

          <motion.div 
            className={styles.card}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className={styles.iconWrapper}>
              <ShieldCheck size={32} color="#3b82f6" />
            </div>
            <h2 className={styles.cardTitle}>Para Auditores</h2>
            <p className={styles.cardText}>
              La seguridad es un pilar fundamental en PRISMA_59. Promueve estándares robustos de autenticación y autorización 
              como los que se utilizaron para proteger el acceso a los tableros.
            </p>
            <ul className={styles.cardList}>
              <li>Autenticación con JWT</li>
              <li>Gateway API para control de acceso</li>
              <li>Protección contra ataques CSRF/XSS</li>
              <li>Validación rigurosa de sesiones</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Link to="/" className={styles.backButton}>
            <ArrowLeft size={20} /> Volver al Inicio de Sesión
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
