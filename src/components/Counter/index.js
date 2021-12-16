import './index.css'

const Counter = props => {
  const {activeCount, increaseQuantity, decreaseQuantity} = props
  const onDecrement = () => {
    decreaseQuantity()
  }

  const onIncrement = () => {
    increaseQuantity()
  }

  return (
    <div className="quantity-controller">
      <button
        type="button"
        testid="decrement-count"
        className="control-button"
        onClick={onDecrement}
      >
        -
      </button>
      <div testid="active-count" className="count">
        {activeCount}
      </div>
      <button
        type="button"
        testid="increment-count"
        className="control-button"
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  )
}

export default Counter
