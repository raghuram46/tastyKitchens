import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {incrementCartItemQuantity, decrementCartItemQuantity} = value
      const {cartItemDetails} = props

      const onClickPlusButton = () => {
        incrementCartItemQuantity(cartItemDetails.id)
      }

      const onClickMinusButton = () => {
        decrementCartItemQuantity(cartItemDetails.id)
      }

      return (
        <li className="cart-item" testid="cartItem">
          <img
            src={cartItemDetails.imageUrl}
            alt="food-item"
            className="cart-image"
          />
          <div className="cart-data-container">
            <h1 className="cart-item-name">{cartItemDetails.name}</h1>
            <div className="quantity-controller">
              <button
                type="button"
                testid="decrement-quantity"
                className="control-button"
                onClick={onClickMinusButton}
              >
                -
              </button>
              <div testid="item-quantity" className="count">
                {cartItemDetails.quantity}
              </div>
              <button
                type="button"
                testid="increment-quantity"
                className="control-button"
                onClick={onClickPlusButton}
              >
                +
              </button>
            </div>
            <p className="cart-item-price">
              <BiRupee /> {cartItemDetails.cost}.00
            </p>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
