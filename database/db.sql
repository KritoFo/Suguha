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
    MODIFY id_clientes INT(11) NOT NULL AUTO_INCREMENT;

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
    MODIFY id_usuarios INT(11) NOT NULL AUTO_INCREMENT;

DESCRIBE usuarios;


CREATE TABLE productos(
    id_producto INT(10) NOT NULL,
    categoria VARCHAR(20) NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    precio DECIMAL(15) NOT NULL,
    cantidad INT(10)
);

ALTER TABLE productos
    ADD PRIMARY KEY (id_producto);

ALTER TABLE productos
    MODIFY productos INT(11) NOT NULL AUTO_INCREMENT;

DESCRIBE productos;