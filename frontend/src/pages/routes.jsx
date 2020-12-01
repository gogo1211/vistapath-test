import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'

import App from './App'

export default function Routes() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/cases" component={App} />
          {/* <Route exact path="/cases/:id" component={CaseDetail} /> */}
          <Redirect path="/" to="/cases" />
        </Switch>
      </Router>
    </div>
  )
}
