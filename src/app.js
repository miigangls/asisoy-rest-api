const express = require('express')
, app = express()
, cors = require('cors')
, multer = require('multer')
, morgan = require('morgan')
, fileUpload = require('express-fileupload')
, bodyParser = require('body-parser')


console.log(process.env.LOCAL_PORT);
// Settings
app.set('port', process.env.PORT || process.env.LOCAL_PORT)

// Middelware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(fileUpload());
console.log( process.env.HOST);


module.exports = app