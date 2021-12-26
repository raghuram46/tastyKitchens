import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import PaymentPage from './components/PaymentPage'
import RestaurantPage from './components/RestaurantPage'
import NotFound from './components/NotFound'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {cartList: []}

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('cartData'))
    if (data) {
      this.setState({cartList: data})
    } else {
      const {cartList} = this.state

      localStorage.setItem('cartData', JSON.stringify(cartList))
    }
  }

  componentDidUpdate() {
    const {cartList} = this.state

    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  addCartItem = cartItemData => {
    const {cartList} = this.state
    const cartListCopy = [...cartList]
    const existingItem = cartListCopy.find(each => each.id === cartItemData.id)

    if (existingItem) {
      existingItem.quantity += cartItemData.quantity
    } else {
      cartListCopy.push(cartItemData)
    }

    this.setState({cartList: cartListCopy})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          const updatedQuantity = eachItem.quantity + 1

          return {...eachItem, quantity: updatedQuantity}
        }

        return eachItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          if (eachItem.quantity === 1) {
            this.removeCartItem(id)
          }
          const updatedQuantity = eachItem.quantity - 1

          return {...eachItem, quantity: updatedQuantity}
        }

        return eachItem
      }),
    }))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredData = cartList.filter(each => each.id !== id)

    this.setState({
      cartList: filteredData,
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeCartItem: this.removeCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantPage}
          />
          <ProtectedRoute exact path="/payment" component={PaymentPage} />
          <ProtectedRoute exact path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
