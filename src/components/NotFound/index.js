import './index.css'
import notFoundImage from '../../assets/images/not-found-image.png'

const NotFound = props => {
  const {history} = props

  const onClickHomePage = () => {
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img src={notFoundImage} alt="not-found" className="not-found-image" />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-text">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <button
        type="button"
        className="home-page-button"
        onClick={onClickHomePage}
      >
        Home Page
      </button>
    </div>
  )
}
export default NotFound
