const mysql = require('mysql2');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((error, connection) => {
    if (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('LA CONEXION CON LA BASE DE DATOS FUE CERRADA');
        }
        if (error.code === 'ER_CON_COUNT_ERROR') {
            console.error('LA BASE DE DATOS TIENE DEMASIADAS CONEXIONES');
        }
        if (error.code === 'ECONNREFUSED') {
            console.error('LA CONEXION FUE RECHAZADA');
        }
    }
    
    if (connection) connection.removeAllListeners();
    console.log('BASE DE DATOS CONECTADA');
    return;
});

//Prosimify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;