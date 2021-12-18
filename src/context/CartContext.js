import React from 'react'

const CartContext = React.createContext({
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  addToCart: () => {},
})

export default CartContext
