CREATE DATABASE suguha;

USE suguha;

CREATE TABLE clientes(
    id INT(10) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    identificacion VARCHAR(12) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(50) NOT NULL,
    direccion VARCHAR(30),
    telefono VARCHAR(15)
);

ALTER TABLE clientes
    ADD PRIMARY KEY (id);

ALTER TABLE clientes
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE clientes;