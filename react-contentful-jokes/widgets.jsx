import React from 'react';
import ReactDOM from 'react-dom';

import AutoComplete from './autocomplete';

class Root extends React.Component {
  render() {
    return(
      <div>
        <AutoComplete />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root/>, document.getElementById('main'));
});
