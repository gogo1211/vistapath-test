import { useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'

import { InputField } from '../../components/FormFields'
import { login } from '../../utils/api'
import './style.css'

export default function Login() {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('admin@medlab.com')
  const [password, setPassword] = useState('123456789')

  const handleLogin = (e) => {
    setLoading(true)
    login({ email, password })
      .then(() => {
        history.push('/cases')
        toast.success('Login success')
      })
      .catch(() => {
        toast.error('Login failed')
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="login-container">
      <div className="card">
        <div className="card-header">
          <p class="card-header-title">Login</p>
        </div>
        <div className="card-content">
          <fieldset>
            <InputField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="field is-grouped is-grouped-centered">
              <div className="control">
                <button
                  className={`button is-primary${loading ? ' is-loading' : ''}`}
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
              <div className="control">
                <button className="button is-primary">Signup</button>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
