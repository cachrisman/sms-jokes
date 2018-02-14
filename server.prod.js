require('dotenv').config()
const compression = require('compression')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const smsResponseHandler = require('./smsResponseHandler')
const app = express()

app.use(compression())
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', (process.env.port || 3000))
app.use('/', express.static(path.join(__dirname, 'public')))

app.post('/sms', smsResponseHandler)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(app.get('port'), () => {
  console.log('Server Started at port %d in %s mode', app.get('port'), app.get('env'))
})
