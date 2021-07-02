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
    console.log(req.body)
    await mysqlConnection.query(`SELECT * FROM alumno AS al JOIN brectemp AS br on al.CODALUM = br.CODALUM WHERE al.CODALUM = ${CODALUM} AND al.ID_ALUMNO = ${ID_ALUMNO} LIMIT 1`, (err, rows, fields) => {
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
//1203563381
router.get('/subjectByStudent', async (req, res) => {
    await mysqlConnection.query(`select a.AREAS_ASIG, a.COD, a.orden as asignaturas, dg.ASIGNATURA as docente_grupo, d.NOMBRES, 
        d.APELLIDOS, d.NUM_DOC FROM asignaturas AS a, docente_grupo AS dg, docentes AS d WHERE dg.GRUPO = ${req.body.curso} AND dg.DOCENTE = d.NUM_DOC 
        AND dg.ASIGNATURA=a.COD and a.COD != 98;`, (err, rows, fields) => {
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
    await mysqlConnection.query(`SELECT orden,codcriterio,criterio from Criterios where codtevaluacion = ${req.body.codtevaluacion} AND active = 1  order by orden;`, (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            console.log(err);
        }
    })
})

module.exports = router