import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
})

export default CartContext
