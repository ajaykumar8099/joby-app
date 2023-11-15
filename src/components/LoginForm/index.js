import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    statusError: false,
  }

  succesLogIn = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  failureLogIn = errorMsg => {
    this.setState({statusError: true, errorMsg})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onUserNameChange = event => {
    this.setState({username: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username: username, password: password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.succesLogIn(data.jwt_token)
    } else {
      this.failureLogIn(data.error_msg)
    }
  }

  userEnter = () => {
    const {username, password} = this.state
    return (
      <form onSubmit={this.onSubmitForm} className="form-cont">
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          placeholder="USERNAME"
          onChange={this.onUserNameChange}
          value={username}
          className="input-el"
        />
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          placeholder="PASSWORD"
          onChange={this.onPasswordChange}
          value={password}
          className="input-el"
        />
        <button type="submit">Login</button>
      </form>
    )
  }

  render() {
    const {statusError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg">
        <div className="sub-card-login">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-login"
          />
          {this.userEnter()}
          {statusError && <p className="error-msg">*{errorMsg}</p>}
        </div>
      </div>
    )
  }
}
export default LoginForm
