import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFilterLeft} from 'react-icons/bs'

import RestaurantCard from '../RestaurantCard'
import leftButton from '../../assets/images/left-icon.png'
import rightButton from '../../assets/images/right-icon.png'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const limit = 9

class AllRestaurants extends Component {
  state = {
    restaurantsList: [],
    activeSortOption: sortByOptions[0].value,
    apiStatus: apiStatusConstants.initial,
    activePageNumber: 1,
  }

  componentDidMount() {
    this.getRestaurantsList()
  }

  onChangeOption = event => {
    this.setState(
      {activeSortOption: event.target.value},
      this.getRestaurantsList,
    )
  }

  onClickRightButton = () => {
    this.setState(
      prevState => ({activePageNumber: prevState.activePageNumber + 1}),
      this.getRestaurantsList,
    )
  }

  onClickLeftButton = () => {
    const {activePageNumber} = this.state
    if (activePageNumber !== 1) {
      this.setState(
        prevState => ({activePageNumber: prevState.activePageNumber - 1}),
        this.getRestaurantsList,
      )
    }
  }

  getRestaurantsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {activeSortOption, activePageNumber} = this.state
    const offset = (activePageNumber - 1) * limit
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeSortOption}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.restaurants.map(each => ({
        hasOnlineDelivery: each.has_online_delivery,
        userRating: each.user_rating,
        name: each.name,
        hasTableBooking: each.has_table_booking,
        isDeliveringNow: each.is_delivering_now,
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        imageUrl: each.image_url,
        id: each.id,
        menuType: each.menu_type,
        location: each.location,
        opensAt: each.opens_at,
        groupByTime: each.group_by_time,
      }))

      this.setState({
        restaurantsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderRestaurantsList = () => {
    const {restaurantsList} = this.state

    return (
      <ul className="restaurants-list">
        {restaurantsList.map(each => (
          <RestaurantCard key={each.id} restaurantData={each} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div testid="restaurants-list-loader" className="loader-container">
      <Loader type="TailSpin" color="#f7931e" height="53.33" width="53.33" />
    </div>
  )

  renderRestaurantsApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      case apiStatusConstants.success:
        return this.renderRestaurantsList()

      default:
        return null
    }
  }

  render() {
    const {activeSortOption, activePageNumber} = this.state
    return (
      <div className="restaurants-container">
        <h1 className="heading">Popular Restaurants</h1>
        <div className="text-filter">
          <p className="text">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="filter-container">
            <BsFilterLeft className="sort-icon" />
            <h1 className="sort-heading">Sort by</h1>
            <select
              value={activeSortOption}
              onChange={this.onChangeOption}
              className="select-filter"
            >
              {sortByOptions.map(each => (
                <option
                  key={each.id}
                  value={each.value}
                  className="sort-option"
                >
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr className="line" />
        {this.renderRestaurantsApiStatus()}
        <div className="pagination">
          <button
            type="button"
            testid="pagination-left-button"
            onClick={this.onClickLeftButton}
            className="pagination-button"
          >
            <img src={leftButton} alt="left-icon" className="pagination-icon" />
          </button>
          <p className="page-number">
            <span testid="active-page-number">{activePageNumber}</span> of 4
          </p>
          <button
            type="button"
            testid="pagination-right-button"
            onClick={this.onClickRightButton}
            className="pagination-button"
          >
            <img
              src={rightButton}
              alt="right-icon"
              className="pagination-icon"
            />
          </button>
        </div>
      </div>
    )
  }
}

export default AllRestaurants
