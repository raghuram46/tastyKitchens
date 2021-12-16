import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import logo from '../../assets/images/footer-logo.png'

import './index.css'

export default function Footer() {
  return (
    <div className="footer">
      <div className="logo-container">
        <img src={logo} alt="website-footer-logo" className="footer-logo" />
        <h1 className="footer-heading">Tasty Kitchens</h1>
      </div>
      <p className="footer-text">
        The only thing we are serious about is food.
        <br />
        Contact us on
      </p>
      <ul className="icons-container">
        <li>
          <button
            type="button"
            testid="pintrest-social-icon"
            className="icon-button"
          >
            <FaPinterestSquare className="social-icon" />
          </button>
        </li>
        <li>
          <button
            type="button"
            testid="instagram-social-icon"
            className="icon-button"
          >
            <FaInstagram className="social-icon" />
          </button>
        </li>
        <li>
          <button
            type="button"
            testid="twitter-social-icon"
            className="icon-button"
          >
            <FaTwitter className="social-icon" />
          </button>
        </li>
        <li>
          <button
            type="button"
            testid="facebook-social-icon"
            className="icon-button"
          >
            <FaFacebookSquare className="social-icon" />
          </button>
        </li>
      </ul>
    </div>
  )
}
