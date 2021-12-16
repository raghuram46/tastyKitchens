import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Counter from '../Counter'

import './index.css'

class FoodItemCard extends Component {
  state = {showAddButton: true, activeCount: 1, cartList: []}

  decreaseQuantity = () => {
    const {activeCount} = this.state
    const {foodItemData} = this.props

    if (activeCount === 1) {
      this.setState(
        prevState => ({
          cartList: prevState.cartList.filter(
            eachItem => eachItem.id !== foodItemData.id,
          ),
          showAddButton: true,
        }),
        this.setCartData,
      )
    } else {
      this.setState(
        prevState => ({activeCount: prevState.activeCount - 1}),
        this.onClickAddButton,
      )
    }
  }

  increaseQuantity = () => {
    this.setState(
      prevState => ({activeCount: prevState.activeCount + 1}),
      this.onClickAddButton,
    )
  }

  setCartData = () => {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))

    this.getCartData()
  }

  getCartData = () => {
    const data = localStorage.getItem('cartData')
    console.log(data)
  }

  onClickAddButton = () => {
    const {activeCount, cartList} = this.state
    console.log(cartList)
    const {foodItemData} = this.props
    const cartItemDetails = {
      cost: foodItemData.cost,
      quantity: activeCount,
      id: foodItemData.id,
      imageUrl: foodItemData.image_url,
      name: foodItemData.name,
    }
    const isItemAvailable = cartList.some(each => each.id === foodItemData.id)

    if (isItemAvailable) {
      this.setState(
        prevState => ({
          cartList: prevState.cartList.map(eachItem => {
            if (eachItem.id === foodItemData.id) {
              return {...eachItem, quantity: activeCount}
            }
            return eachItem
          }),
        }),
        this.setCartData,
      )
    } else {
      this.setState(
        prevState => ({
          cartList: [...prevState.cartList, cartItemDetails],
          showAddButton: false,
        }),
        this.setCartData,
      )
    }
  }

  render() {
    const {showAddButton, activeCount} = this.state
    const {foodItemData} = this.props
    const updatedData = {
      name: foodItemData.name,
      cost: foodItemData.cost,
      foodType: foodItemData.food_type,
      imageUrl: foodItemData.image_url,
      id: foodItemData.id,
      rating: foodItemData.rating,
    }

    return (
      <li testid="foodItem" className="food-item">
        <img
          src={updatedData.imageUrl}
          alt="food-item"
          className="food-image"
        />
        <div className="food-item-details">
          <h1 className="item-name">{updatedData.name}</h1>
          <p className="price">
            <BiRupee /> {updatedData.cost}.00
          </p>
          <div className="rating-container">
            <AiFillStar className="star-icon-food" />
            <p className="item-rating">{updatedData.rating}</p>
          </div>
          {showAddButton ? (
            <button
              type="button"
              className="add-button"
              onClick={this.onClickAddButton}
            >
              ADD
            </button>
          ) : (
            <Counter
              decreaseQuantity={this.decreaseQuantity}
              increaseQuantity={this.increaseQuantity}
              activeCount={activeCount}
            />
          )}
        </div>
      </li>
    )
  }
}

export default FoodItemCard
