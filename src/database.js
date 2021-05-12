const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'bhzh6sues3xmk8ftnz8r-mysql.services.clever-cloud.com',
    user: 'urw0mlf4pczkgm7n',
    password: 'Wf9YDwathGoNimYzIf3i',
    database: 'bhzh6sues3xmk8ftnz8r'
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