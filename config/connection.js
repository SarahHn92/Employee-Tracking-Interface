const mysql = require('mysql');


const connection = mysql.createConnection(
    
    {
        host: 'localhost',
        port: 3306,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER
    }
);



module.exports = connection;

