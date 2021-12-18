import './index.css'

const CarouselItem = props => {
  const {itemData} = props

  return (
    <li>
      <img src={itemData.imageUrl} alt="offer" className="offer-image" />
    </li>
  )
}

export default CarouselItem
