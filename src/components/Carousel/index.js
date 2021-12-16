import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const Carousel = props => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }
  const {offersList} = props

  return (
    <ul className="offers-container">
      <Slider {...settings}>
        {offersList.map(eachOffer => (
          <li>
            <img src={eachOffer.imageUrl} alt="offer" className="offer-image" />
          </li>
        ))}
      </Slider>
    </ul>
  )
}

export default Carousel
