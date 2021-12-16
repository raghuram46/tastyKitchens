import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantCard = props => {
  const {restaurantData} = props
  const {userRating, id} = restaurantData
  const updatedUserRating = {
    rating: userRating.rating,
    ratingColor: userRating.rating_color,
    ratingText: userRating.rating_text,
    totalReviews: userRating.total_reviews,
  }

  return (
    <Link to={`/restaurant/${id}`} className="link">
      <li testid="restaurant-item" className="restaurant-card">
        <img
          src={restaurantData.imageUrl}
          alt="restaurant"
          className="restaurant-image"
        />
        <div className="data">
          <h1 className="name">{restaurantData.name}</h1>
          <p className="cuisine">{restaurantData.cuisine}</p>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating">{updatedUserRating.rating}</p>
            <p className="reviews">({updatedUserRating.totalReviews})</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantCard
