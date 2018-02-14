import { Switch, Route, Redirect } from 'react-router-dom'
import SMS from './SMS'
import Jokes from './Jokes'
import NotFound from './NotFound'

const Main = () => (
  <div className='content'>
    <Switch>
      <Route exact path='/' component={Jokes} />
      <Route path='/sms' component={SMS} />
      <Route path='/404' component={NotFound} />
      <Redirect to='/404' component={NotFound} />
    </Switch>
  </div>
)

export default Main
