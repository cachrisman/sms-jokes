import { Link } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'

const Header = () => (
  <header>
    <nav class="nav" role="navigation">
      <ul className='nav-list'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/sms">Do you like texting?</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header
