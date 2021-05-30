const mysql = require('mysql');


const connection = mysql.createConnection(
    
    {
        host: 'localhost',
        port: 3306,
        database: 'tracker_db',
        password: '2640',
        user: 'root'
    }
)



module.exports = connection;

