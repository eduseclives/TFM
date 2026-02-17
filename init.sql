CREATE DATABASE IF NOT EXISTS users_db;
CREATE DATABASE IF NOT EXISTS products_db;
CREATE DATABASE IF NOT EXISTS orders_db;

GRANT ALL PRIVILEGES ON users_db.* TO 'user'@'%';
GRANT ALL PRIVILEGES ON products_db.* TO 'user'@'%';
GRANT ALL PRIVILEGES ON orders_db.* TO 'user'@'%';
FLUSH PRIVILEGES;

USE users_db;
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'USER'
);

INSERT INTO users (username, password, role) VALUES ('admin', 'password123', 'ADMIN') 
ON DUPLICATE KEY UPDATE username=username;
