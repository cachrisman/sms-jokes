require('dotenv').config()
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const path = require('path')
const bodyParser = require('body-parser')
var morgan = require('morgan')

const smsResponseHandler = require('./smsResponseHandler')
const app = express()
const config = require('./webpack.dev.js');
const compiler = webpack(config);

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', (process.env.port || 3000))

app.use('/', express.static(path.join(__dirname, 'public')))

app.post('/sms', smsResponseHandler)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));


app.listen(app.get('port'), () => {
  console.log('Server Started at port %d in %s mode', app.get('port'), app.get('env'))
})
