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
    await mysqlConnection.query(`SELECT * FROM alumno AS al JOIN brectemp AS br on al.CODALUM = br.CODALUM WHERE al.CODALUM = ${CODALUM} AND al.ID_ALUMNO = ${ID_ALUMNO} LIMIT 1`, (err, rows, fields) => {
        if (!err) {
            if (rows.length) {
                res.status(200).send({ status: 200, data: rows });
            } else {
                res.status(500).send({ status: 200, data: [] });
            }
        } else {
            res.status(500).send({ status: 500, error: "Internal Server Error", message: err });
        }
    })
})

//1203563381
router.post('/subjectByStudent', async (req, res) => {
    const { CURSO } = req.body
    await mysqlConnection.query(`SELECT a.AREAS_ASIG, a.COD, a.orden AS asignaturas, dg.ASIGNATURA AS docente_grupo, d.NOMBRES, 
        d.APELLIDOS, d.NUM_DOC FROM asignaturas AS a, docente_grupo AS dg, docentes AS d WHERE dg.GRUPO = ? AND dg.DOCENTE = d.NUM_DOC 
        AND dg.ASIGNATURA=a.COD and a.COD != 98;`, [CURSO], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({ status: 200, message: "", data: rows });
        } else {
            res.status(500).send({ status: 500, error: "Internal Server Error", message: err, data: [] });
        }
    })
})

router.post('/studentsBysubject', async (req, res) => {
    const { ASIGNATURA } = req.body
    await mysqlConnection.query(`SELECT * FROM alumno INNER JOIN brectemp ON alumno.CODALUM = brectemp.CODALUM WHERE brectemp.ASIGNATURA = ?`, [ASIGNATURA], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({ status: 200, message: "", data: rows });
        } else {
            res.status(500).send({ status: 500, error: "Internal Server Error", message: err, data: [] });
            console.log(err);
        }
    })
})


router.post('/questions', async (req, res) => {
    const { CODTEEVALUACION } = req.body
    await mysqlConnection.query(`SELECT * FROM Criterios WHERE codtevaluacion = ?  AND activo = ? ;`, [CODTEEVALUACION, 1], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({ status: 200, message: "", data: rows });
        } else {
            res.status(500).send({ status: 500, error: "Internal Server Error", message: err, data: [] });
            console.log(err);
        }
    })
})

module.exports = router
