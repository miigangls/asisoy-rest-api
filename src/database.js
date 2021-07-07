const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

mysqlConnection.connect((err) => {
    if (err) {
        console.log(err.message)
        return {}
    } else {
        console.log('DB is connected');
    }
})

module.exports = mysqlConnection