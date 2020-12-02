import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Login from './Login'
import Cases from './Cases'

export default function Routes() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/cases" component={Cases} />
          {/* <Route exact path="/cases/:id" component={CaseDetail} /> */}
          <Redirect path="/" to="/login" />
        </Switch>
      </Router>
      <ToastContainer autoClose={3000} />
    </>
  )
}
