const express = require('express')
, app = express()
, bodyParser = require('body-parser')
// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(require('./routes/students'))

app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`))