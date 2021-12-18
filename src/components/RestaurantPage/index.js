import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import RestaurantDetails from '../RestaurantDetails'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class RestaurantPage extends Component {
  state = {restaurantDetails: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.name,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        id: data.id,
        foodItems: data.food_items,
        itemsCount: data.items_count,
        location: data.location,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }

      this.setState({
        restaurantDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div testid="restaurant-details-loader" className="loader-container">
      <Loader type="TailSpin" color="#f7931e" height="53.33" width="53.33" />
    </div>
  )

  renderRestaurantApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      case apiStatusConstants.success:
        return this.renderRestaurantDetails()

      default:
        return null
    }
  }

  renderRestaurantDetails = () => {
    const {restaurantDetails} = this.state

    return (
      <RestaurantDetails
        key={restaurantDetails.id}
        restaurantDetails={restaurantDetails}
      />
    )
  }

  render() {
    return (
      <>
        <Header />
        {this.renderRestaurantApiStatus()}
        <Footer />
      </>
    )
  }
}

export default RestaurantPage
