require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const _contentful = require('contentful')
const MessagingResponse = require('twilio').twiml.MessagingResponse

const contentful = _contentful.createClient({
  space: process.env.SPACE,
  accessToken: process.env.CDA_TOKEN
})

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', (process.env.port || 5000))

app.post('/sms', function(req, res) {

  // source phone number
  let source_number = req.body.From
  // destination phone number
  let destination_number = req.body.To
  // The text which was received
  let body = req.body.Body

  contentful.getEntries({
    content_type: 'joke',
    'fields.sport.sys.contentType.sys.id': 'sport',
    'fields.sport.fields.name[match]': body
  }).then((response) => {
    console.log(source_number, destination_number, body)
    if (response.items.length) {
      let joke = response.items[Math.floor(Math.random() * response.items.length)]
      console.log(joke.fields.title,joke.fields.body)
      var twiml = new MessagingResponse();
      twiml.message(`Here's your joke about ${body}:\n` + joke.fields.body);
      console.log(twiml.toString())
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    } else {
      contentful.getEntries({content_type: 'joke'}).then(response => {
        let joke = response.items[Math.floor(Math.random() * response.items.length)]
        console.log(joke.fields.title,joke.fields.body)
        var twiml = new MessagingResponse();
        twiml.message(`We couldn't find a joke about ${body}, so here's a joke about ${joke.fields.sport.fields.name}:\n` + joke.fields.body);
        console.log(twiml.toString())
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
      })
    }
  }).catch(console.error)
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})

// here's a change
