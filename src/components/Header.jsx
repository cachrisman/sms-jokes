import { Link } from 'react-router-dom'

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
