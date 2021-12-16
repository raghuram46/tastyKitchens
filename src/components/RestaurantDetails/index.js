import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import FoodItemCard from '../FoodItemCard'
import './index.css'

const RestaurantDetails = props => {
  const {restaurantDetails} = props

  return (
    <>
      <div className="dashboard">
        <img
          src={restaurantDetails.imageUrl}
          alt="restaurant"
          className="dashboard-image"
        />
        <div className="details-container">
          <h1 className="rest-name">{restaurantDetails.name}</h1>
          <p className="rest-cuisine">{restaurantDetails.cuisine}</p>
          <p className="rest-location">{restaurantDetails.location}</p>
          <div className="rating-cost-container">
            <div className="rest-rating-reviews">
              <div className="icon-rating-container">
                <AiFillStar className="rating-icon" />
                <p className="rating">{restaurantDetails.rating}</p>
              </div>
              <p className="rest-reviews">
                {restaurantDetails.reviewsCount} Ratings
              </p>
            </div>
            <hr className="bar" />
            <div className="cost-container">
              <p className="cost">
                <BiRupee /> {restaurantDetails.costForTwo}
              </p>
              <p className="cost-text">Cost for two</p>
            </div>
          </div>
        </div>
      </div>
      <ul className="food-items-list">
        {restaurantDetails.foodItems.map(eachItem => (
          <FoodItemCard key={eachItem.id} foodItemData={eachItem} />
        ))}
      </ul>
    </>
  )
}

export default RestaurantDetails
