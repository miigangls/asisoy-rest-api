const express = require('express')
, app = express()

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(express.json())

// Routes
app.use(require('./routes/students'))

app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`))