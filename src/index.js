require('dotenv').config();
const app = require('./app')

app.get('*', function (req, res) {
    res.send('welcom rest API')
})

// Routes
app.use(require('./routes/students'))

app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`))