import {Link} from 'react-router-dom'

import {BiRupee} from 'react-icons/bi'

import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import emptyCartImage from '../../assets/images/empty-cart-image.png'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const renderEmptyCartView = () => (
        <div className="empty-cart">
          <img
            src={emptyCartImage}
            alt="empty cart"
            className="empty-cart-image"
          />
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

      const getTotal = (total, item) => {
        const itemPrice = item.cost * item.quantity

        return total + itemPrice
      }

      const renderCartData = () => {
        const totalPrice = cartList.reduce(getTotal, 0)
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
              <Link to="/payment">
                <button type="button" className="place-order-button">
                  Place Order
                </button>
              </Link>
            </div>
            <Footer />
          </>
        )
      }

      return (
        <>
          <Header />
          {cartList.length === 0 ? renderEmptyCartView() : renderCartData()}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
