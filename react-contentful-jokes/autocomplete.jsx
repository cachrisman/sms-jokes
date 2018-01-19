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
      sports: [],
      css_class: 'loader',
      hidden_class: ''
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
    this.setState({css_class: 'loader'})
    let sport = event.currentTarget.innerText;
    contentfulClient.getEntries({
      content_type: 'joke',
      'fields.sport.sys.contentType.sys.id': 'sport',
      'fields.sport.fields.name[match]': sport
    }).then(data => {
      let joke
      if (data.items.length) joke = data.items[Math.floor(Math.random() * data.items.length)].fields
      else joke = { body:"sorry no joke for you" }
      this.setState({ joke: joke }, () => {
        setTimeout(() => this.setState({css_class: "", hidden_class: ""}), 750)
      });
    })
  }

  render() {
    let results = this.state.sports.map((result, i) => {
      return (<li key={i} onClick={this.selectSport}>{result}</li>);
    });
      return (<div>
        <h1 className='header_text'>Click a sport to get a joke</h1>
        <div className='auto'>
          <ul className='sports_list'>
            {results}
          </ul>
        </div>{!this.state.joke ? '' : <div><div className='joke_header_text animated bounceInLeft'>Here's a great {this.state.joke.sport.fields.name.toLowerCase()} joke!</div><ReactMarkdown className={`joke_body ${this.state.css_class}`} source={this.state.joke.body}/></div>}
      </div>);
  }
};
