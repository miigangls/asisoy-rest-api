const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'bb9yqnxe3cqzrfclyysu-mysql.services.clever-cloud.com',
    user: 'u2c3gzfuaxcdonan',
    password: 'Jpy5ZqcvngNAiPrBEEIH',
    database: 'bb9yqnxe3cqzrfclyysu'
})

mysqlConnection.connect((err) => {
    if(err) {
        console.log(err)
        return {}   
    } else {
        console.log('DB is connected');
    }
})

module.exports = mysqlConnection