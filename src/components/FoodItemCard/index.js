import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Counter from '../Counter'
import CartContext from '../../context/CartContext'

import './index.css'

const FoodItemCard = props => {
  const {foodItemData} = props
  const updatedData = {
    name: foodItemData.name,
    cost: foodItemData.cost,
    foodType: foodItemData.food_type,
    imageUrl: foodItemData.image_url,
    id: foodItemData.id,
    rating: foodItemData.rating,
  }
  const cartItemData = {
    name: foodItemData.name,
    cost: foodItemData.cost,
    imageUrl: foodItemData.image_url,
    id: foodItemData.id,
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {
          cartList,
          addCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value

        const currentFoodItem = cartList.filter(
          eachItem => eachItem.id === updatedData.id,
        )

        const activeCount =
          currentFoodItem.length > 0 ? currentFoodItem[0].quantity : 1

        const onClickAddButton = () => {
          addCartItem({...cartItemData, quantity: activeCount})
        }

        const increaseQuantity = () => {
          incrementCartItemQuantity(cartItemData.id)
        }

        const decreaseQuantity = () => {
          decrementCartItemQuantity(cartItemData.id)
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
              <Counter
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
                addItemToCart={onClickAddButton}
                activeCount={activeCount}
              />
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default FoodItemCard
