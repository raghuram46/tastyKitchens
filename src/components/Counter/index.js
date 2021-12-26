import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {showAddButton: true}

  onDecrement = () => {
    const {decreaseQuantity, activeCount} = this.props

    if (activeCount === 1) {
      this.setState({showAddButton: true}, decreaseQuantity())
    } else {
      decreaseQuantity()
    }
  }

  onIncrement = () => {
    const {increaseQuantity} = this.props
    increaseQuantity()
  }

  onClickAddButton = () => {
    const {addItemToCart} = this.props

    this.setState({showAddButton: false}, addItemToCart())
  }

  render() {
    const {activeCount} = this.props
    const {showAddButton} = this.state

    return showAddButton ? (
      <button
        type="button"
        className="add-button"
        onClick={this.onClickAddButton}
      >
        ADD
      </button>
    ) : (
      <div className="quantity-controller">
        <button
          type="button"
          testid="decrement-count"
          className="control-button"
          onClick={this.onDecrement}
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
          onClick={this.onIncrement}
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
