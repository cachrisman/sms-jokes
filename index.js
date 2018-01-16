const express = require('express')
const bodyParser = require('body-parser')
const _contentful = require('contentful')
const MessagingResponse = require('twilio').twiml.MessagingResponse

const contentful = _contentful.createClient({
  space: process.env.space,
  accessToken: process.env.accessToken
})

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', (process.env.PORT || 5000))

app.post('/sms', function(req, res) {
  console.log (req.body)

  // Sender's phone number
  let source_number = req.body.From
  // Receiver's phone number - Plivo number
  let destination_number = req.body.To
  // The text which was received
  let body = req.body.Body

  contentful.getEntries({
    content_type: 'joke',
    'fields.sport.sys.contentType.sys.id': 'sport',
    'fields.sport.fields.name[match]': body
  }).then((response) => {
    console.log(JSON.stringify(response,null,2))
    let entries = response.items
    let entry = entries[Math.floor(Math.random() * entries.length)]
    console.log(entry)
    var twiml = new MessagingResponse();
    twiml.message(entry.fields.body);
    console.log(twiml.toString())
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }).catch(console.error)
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})
