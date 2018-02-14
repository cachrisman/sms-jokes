require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
var morgan = require('morgan')

const smsResponseHandler = require('./smsResponseHandler')
const app = express()
const port = process.env.port || 3000

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', (port))
app.use('/', express.static('public'))

app.post('/sms', smsResponseHandler)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(app.get('port'), () => {
  console.log('Server Started at port %d in %s mode', app.get('port'), app.get('env'))
})
