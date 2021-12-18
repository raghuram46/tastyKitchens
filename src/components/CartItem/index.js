import {BiRupee} from 'react-icons/bi'

import './index.css'

const CartItem = props => {
  const {cartItemDetails} = props

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
}

export default CartItem
