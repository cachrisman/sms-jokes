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
      hidden_class: 'hidden'
    };
    this.selectSport = this.selectSport.bind(this);
    this.renderJoke = this.renderJoke.bind(this);
    this.resetJoke = this.resetJoke.bind(this);
  }

  componentWillMount() {
    contentfulClient.getEntries({content_type: 'sport'}).then(data => {
      var sports = data.items.length ? data.items.map(x => x.fields.name) : []
      setTimeout(() => this.setState({ sports: sports }), 750)
    })
  }

  selectSport(event) {
    this.setState({css_class: 'loader', hidden_class: 'hidden'})
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
        setTimeout(() => this.setState({css_class: "animated fadeIn", hidden_class: ""}), 750)
      });
    })
  }

  renderJoke() {
    return (
      <div className='animated fadeIn'>
        <div className='horizontal-rule'></div>
        <div className='joke_header_text'>
          Here's a great {this.state.joke.sport.fields.name.toLowerCase()} joke!
        </div>
        <div className={this.state.css_class}>
          <ReactMarkdown className='joke_body' source={this.state.joke.body} />
          <div className={`reset ${this.state.hidden_class}`} onClick={this.resetJoke}>Reset</div>
        </div>
      </div>
  )}

  resetJoke() {
    this.setState({joke: ''})
  }

  render() {
    let results = this.state.sports.map((result, i) => {
      return (<li className='animated fadeIn' key={i} onClick={this.selectSport}>{result}</li>);
    });
      return (<div>
        <h1 className='header_text'>Click a sport to get a joke</h1>
        <div className='auto'>
          <ul className='sports_list animated fadeIn'>
            {results}
          </ul>
        </div>{!this.state.joke ? '' : this.renderJoke()}
        <div className='sms'><p>Do you like texting?</p></div>
      </div>
      );
  }
};
