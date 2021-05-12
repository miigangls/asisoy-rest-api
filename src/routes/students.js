const express = require('express')
, router = express.Router()
, mysqlConnection = require('../database')

router.get('/allStudents', async (req, res) => {
    await mysqlConnection.query('SELECT * FROM alumno', (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            console.log(err);
        }
    })
})

router.post('/login', async (req, res) => {
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

router.post('/subjectByStudent', async (req, res) => {
    let { CODALUM } = req.body
    await mysqlConnection.query(`select * from asignaturas inner join brectemp on asignaturas.COD = brectemp.ASIGNATURA where brectemp.CODALUM = ?`, [CODALUM], (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            console.log(err);
        }
    })
})

router.post('/studentsBysubject', async (req, res) => {
    let { ASIGNATURA } = req.body
    await mysqlConnection.query(`select * from alumno inner join brectemp on alumno.CODALUM = brectemp.CODALUM where brectemp.ASIGNATURA = ?`, [ASIGNATURA], (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            console.log(err);
        }
    })
})

router.get('/questions', async (req, res) => {
    await mysqlConnection.query('SELECT * FROM Criterios', (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            console.log(err);
        }
    })
})

module.exports = router