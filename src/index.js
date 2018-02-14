import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'

window.addEventListener("load", () => {
  ReactDOM.render((
    <Router>
      <App />
    </Router>
  ), document.getElementById('app'))
})
