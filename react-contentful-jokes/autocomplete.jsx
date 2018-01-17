import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
      joke: null
    };
    this.selectSport = this.selectSport.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    this.setState({inputVal: event.currentTarget.value});
  }

  matches() {
    const matches = [];
    if (this.state.inputVal.length === 0) {
      return this.props.sports;
    }

    this.props.sports.forEach(sport => {
      let sub = sport.slice(0, this.state.inputVal.length);
      if (sub.toLowerCase() === this.state.inputVal.toLowerCase()) {
        matches.push(sport);
      }
    });

    if (matches.length === 0) {
      matches.push('No matches');
    }

    return matches;
  }

  selectSport(event) {

    let sport = event.currentTarget.innerText;

    this.setState({
      inputVal: sport
    }, () => {

      let url = 'https://cdn.contentful.com/spaces/17v30p4tpq7p/entries?access_token=84146e8521b6950b0c66596bb1207879b8721b239c700c9364a36a54fce87bcc&content_type=joke&fields.sport.sys.contentType.sys.id=sport&fields.sport.fields.name[match]='

      url += this.state.inputVal

      console.log(url);

      let xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.status === 200 && xmlhttp.readyState === XMLHttpRequest.DONE) {
          const data = JSON.parse(xmlhttp.responseText);
          let idx = Math.floor(Math.random() * data.items.length)
          console.log(idx);
          this.setState({
            joke: data.items[idx].fields
          });
        }
      };
      xmlhttp.open('GET', url, true);
      xmlhttp.send();
    });
  }

  render() {
    let results = this.props.sports.map((result, i) => {
      return (<li key={i} onClick={this.selectSport}>{result}</li>);
    });
    if (!this.state.joke) {
      return (<div>
        <h1>Enter a sport to get a result</h1>
        <div className='auto'>
          <input onChange={this.handleInput} value={this.state.inputVal} placeholder='Search...'/>
          <ul>
            {results}
          </ul>
        </div>
      </div>);
    } else {
      return (<div>
        <h1>Enter a sport to get a result</h1>
        <div className='auto'>
          <input onChange={this.handleInput} value={this.state.inputVal} placeholder='Search...'/>
          <ul>
            {results}
          </ul>
        </div>
        <div>{this.state.joke.title}</div>
      </div>)
    }
  }
};
