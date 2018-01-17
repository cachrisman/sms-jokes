import React from 'react';
import ReactDOM from 'react-dom';

import AutoComplete from './autocomplete';

const Sports = [
  'Baseball',
  'Basketball',
  'Football',
  'Hockey'
]

class Root extends React.Component {
  render() {
    return(
      <div>
        <AutoComplete sports={Sports} />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root/>, document.getElementById('main'));
});
