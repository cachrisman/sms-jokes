import React from 'react';
import ReactMarkdown from 'react-markdown';
import * as contentful from 'contentful';

const contentfulClient = contentful.createClient({
  space: '17v30p4tpq7p',
  accessToken: '84146e8521b6950b0c66596bb1207879b8721b239c700c9364a36a54fce87bcc'
})

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
      joke: null,
      sports: []
    };
    this.selectSport = this.selectSport.bind(this);
  }

  componentWillMount() {
    contentfulClient.getEntries({content_type: 'sport'}).then(data => {
      var sports = data.items.length ? data.items.map(x => x.fields.name) : []
      // console.log(sports)
      this.setState({ sports: sports });
    })
  }

  selectSport(event) {
    let sport = event.currentTarget.innerText;
    contentfulClient.getEntries({
      content_type: 'joke',
      'fields.sport.sys.contentType.sys.id': 'sport',
      'fields.sport.fields.name[match]': sport
    }).then(data => {
      let joke
      if (data.items.length) joke = data.items[Math.floor(Math.random() * data.items.length)].fields
      else joke = { body:"sorry no joke for you" }
      this.setState({ joke: joke });
    })
  }

  render() {
    let results = this.state.sports.map((result, i) => {
      return (<li key={i} onClick={this.selectSport}>{result}</li>);
    });
      return (<div>
        <h1>Click a sport to get a joke</h1>
        <div className='auto'>
          <ul>
            {results}
          </ul>
        </div>
        <div>{!this.state.joke ? '' : <ReactMarkdown source={this.state.joke.body}/>}</div>
      </div>);
  }
};
