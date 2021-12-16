import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import loginImage1 from '../../assets/images/login-image-desktop.png'
import loginImage2 from '../../assets/images/login-image-mobile.png'
import logo from '../../assets/images/login-logo.png'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: 'false', errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg, username: '', password: ''})
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const loginUrl = 'https://apis.ccbp.in/login'

    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className="login-page-container">
          <div className="login-container">
            <form className="login-form" onSubmit={this.onClickLogin}>
              <img src={logo} alt="website logo" className="website-logo" />
              <p className="logo-heading">Tasty Kitchens</p>
              <h1 className="login-heading">Login</h1>
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="user-input"
                onChange={this.onChangeUsername}
                value={username}
              />
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="user-input"
                onChange={this.onChangePassword}
                value={password}
              />
              {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
          <div className="banner-container">
            <img src={loginImage1} alt="website login" className="banner" />
          </div>
        </div>
        <div className="mobile-login-page">
          <img
            src={loginImage2}
            alt="website login"
            className="mobile-login-image"
          />
          <form onSubmit={this.onClickLogin}>
            <h1 className="login-heading">Login</h1>
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="user-input"
              onChange={this.onChangeUsername}
              value={username}
            />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="user-input"
              onChange={this.onChangePassword}
              value={password}
            />
            {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </>
    )
  }
}

export default Login
