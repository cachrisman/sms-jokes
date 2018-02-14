import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'

document.addEventListener("DOMContentLoaded", () => {
  console.log('DOMContentLoaded event fired')
})

window.addEventListener("load", () => {
  console.log('load event fired')

  ReactDOM.render((
    <Router>
      <App />
    </Router>
  ), document.getElementById('app'))
})
