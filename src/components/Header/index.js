import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {RiCloseCircleFill} from 'react-icons/ri'

import logo from '../../assets/images/login-logo.png'
import './index.css'

class Header extends Component {
  state = {showMenu: false}

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderMenuItems = () => {
    const {match} = this.props
    const {path} = match
    const activeHomeClassName = path === '/' ? 'active-nav-item' : 'nav-item'
    const activeCartClassName =
      path === '/cart' ? 'active-nav-item' : 'nav-item'
    return (
      <ul className="menu-list">
        <Link to="/" className={activeHomeClassName}>
          <li>Home</li>
        </Link>
        <Link to="/cart" className={activeCartClassName}>
          <li>Cart</li>
        </Link>
        <button
          type="button"
          onClick={this.onClickLogout}
          className="logout-button"
        >
          Logout
        </button>
        <button type="button" className="menu" onClick={this.onCLickMenu}>
          <RiCloseCircleFill className="close-icon" />
        </button>
      </ul>
    )
  }

  onCLickMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  render() {
    const {showMenu} = this.state
    const {match} = this.props
    const {path} = match

    const activeHomeClassName = path === '/' ? 'active-nav-item' : 'nav-item'
    const activeCartClassName =
      path === '/cart' ? 'active-nav-item' : 'nav-item'

    return (
      <>
        <nav className="header">
          <div className="nav-content">
            <Link to="/" className="nav-logo">
              <img src={logo} alt="website logo" className="header-logo" />
              <p className="tasty-kitchens">Tasty Kitchens</p>
            </Link>
            <ul className="nav-list">
              <Link to="/" className={activeHomeClassName}>
                <li>Home</li>
              </Link>
              <Link to="/cart" className={activeCartClassName}>
                <li>Cart</li>
              </Link>
              <button
                type="button"
                onClick={this.onClickLogout}
                className="logout-button"
              >
                Logout
              </button>
            </ul>
            <button type="button" className="menu" onClick={this.onCLickMenu}>
              <GiHamburgerMenu className="hamburger" />
            </button>
          </div>
        </nav>
        {showMenu && this.renderMenuItems()}
      </>
    )
  }
}

export default withRouter(Header)
