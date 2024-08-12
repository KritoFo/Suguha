CREATE DATABASE suguha;

USE suguha;

CREATE TABLE clientes(
    id_clientes INT(10) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    identificacion VARCHAR(12) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(100) NOT NULL,
    direccion VARCHAR(30),
    telefono VARCHAR(15)
);

ALTER TABLE clientes
    ADD PRIMARY KEY (id_clientes);

ALTER TABLE clientes
    MODIFY id_clientes INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE clientes;


CREATE TABLE usuarios(
    id_usuarios INT(10) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    identificacion VARCHAR(12) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(50) NOT NULL,
    telefono VARCHAR(15)
);

ALTER TABLE usuarios
    ADD PRIMARY KEY (id_usuarios);

ALTER TABLE usuarios
    MODIFY id_usuarios INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE usuarios;