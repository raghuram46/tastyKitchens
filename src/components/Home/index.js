import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import Carousel from '../Carousel'
import AllRestaurants from '../AllRestaurants'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    offersList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantOffers()
  }

  getRestaurantOffers = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const offersUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(offersUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.offers.map(each => ({
        imageUrl: each.image_url,
        id: each.id,
      }))

      this.setState({
        offersList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div testid="restaurants-offers-loader" className="loader-container">
      <Loader type="TailSpin" color="#f7931e" height="53.33" width="53.33" />
    </div>
  )

  renderOffersApiStatus = () => {
    const {apiStatus, offersList} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      case apiStatusConstants.success:
        return <Carousel offersList={offersList} />

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderOffersApiStatus()}
        <AllRestaurants />
        <Footer />
      </>
    )
  }
}

export default Home
