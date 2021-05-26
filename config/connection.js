const mysql = require('mysql');
require('dotenv').config;

const connection = mysql.createConnection(
    process.env.DB_NAME,
    process.env.DB_PASSWORD,
    process.env.DB_USER,
    {
        host: 'localhost',
        port: 3306
    }
)

module.exports = connection;

