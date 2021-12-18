import {Component} from 'react'
import {Link} from 'react-router-dom'

import {BiRupee} from 'react-icons/bi'

import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'

import emptyCartImage from '../../assets/images/empty-cart-image.png'
import './index.css'

class Cart extends Component {
  state = {cartList: []}

  componentDidMount() {
    const data = localStorage.getItem('cartData')
    this.setState({cartList: JSON.parse(data)})
  }

  getTotal = (total, item) => {
    const itemPrice = item.cost * item.quantity

    return total + itemPrice
  }

  onCLickPlaceOrder = () => {
    const {history} = this.props
    history.push('/payment')
  }

  renderEmptyCartView = () => (
    <div className="empty-cart">
      <img src={emptyCartImage} alt="empty cart" className="empty-cart-image" />
      <h1 className="empty-cart-heading">No Order Yet!</h1>
      <p className="empty-cart-text">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button type="button" className="empty-cart-button">
          Order Now
        </button>
      </Link>
    </div>
  )

  renderCartData = () => {
    const {cartList} = this.state
    const totalPrice = cartList.reduce(this.getTotal, 0)
    return (
      <>
        <div className="cart-container">
          <ul className="cart-header">
            <li className="header-item">Item</li>
            <li className="header-item">Quantity</li>
            <li className="header-item">Price</li>
          </ul>
          <ul className="cart-item-container">
            {cartList.map(eachItem => (
              <CartItem key={eachItem.id} cartItemDetails={eachItem} />
            ))}
          </ul>
          <hr className="line-break" />
          <h1 className="cart-summary">
            <span>Order Total: </span>
            <span className="total-price" testid="total-price">
              <BiRupee /> {totalPrice}.00
            </span>
          </h1>
          <button
            type="button"
            className="place-order-button"
            onClick={this.onCLickPlaceOrder}
          >
            Place Order
          </button>
        </div>
        <Footer />
      </>
    )
  }

  render() {
    const {cartList} = this.state
    return (
      <>
        <Header />
        {cartList.length === 0
          ? this.renderEmptyCartView()
          : this.renderCartData()}
      </>
    )
  }
}

export default Cart
