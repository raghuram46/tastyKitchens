import {Link} from 'react-router-dom'

import Header from '../Header'

import successIcon from '../../assets/images/payment-succes-icon.png'
import './index.css'

const PaymentPage = () => (
  <>
    <Header />
    <div className="payment-status">
      <img
        src={successIcon}
        alt="payment success"
        className="payment-success-icon"
      />
      <h1 className="payment-heading">Payment Successful</h1>
      <p className="payment-text">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/">
        <button type="button" className="home-page-button">
          Go To Home
        </button>
      </Link>
    </div>
  </>
)
export default PaymentPage
