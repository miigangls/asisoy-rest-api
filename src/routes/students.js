const express = require('express')
, router = express.Router()
, mysqlConnection = require('../database')

router.get('/', async (req, res) => {
    await mysqlConnection.query('SELECT * FROM alumno', (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            console.log(err);
        }
    })
})

router.post('/', async (req, res) => {
    let { CODALUM, ID_ALUMNO } = req.body
    await mysqlConnection.query(`SELECT * FROM alumno WHERE CODALUM = ? AND ID_ALUMNO = ?`, [CODALUM, ID_ALUMNO], (err, rows, fields) => {
        if (!err) {
            if(rows.length) {
                res.json({
                    status: true,
                    data: rows
                })
            } else {
                res.json({
                    status: false
                })
            }
        } else {
            console.log(err);
        }
    })
})

router.post('/studentsByCourse', async (req, res) => {
    let { COD } = req.body
    await mysqlConnection.query(`SELECT * FROM alumno WHERE COD = ?`, [COD], (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            console.log(err);
        }
    })
})


router.get('/courses', async (req, res) => {
    await mysqlConnection.query(`SELECT * FROM asignaturas`, (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            console.log(err);
        }
    })
})

module.exports = router