import {Component} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import './index.css'

class CartSummary extends Component {
  state = {
    selectedPayment: '',
    orderPlaced: false,
  }

  handlePaymentChange = event => {
    this.setState({selectedPayment: event.target.value})
  }

  handleConfirmOrder = close => {
    this.setState({orderPlaced: true, selectedPayment: ''})
    close()
  }

  render() {
    const {selectedPayment, orderPlaced} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          let total = 0
          cartList.forEach(eachItem => {
            total += eachItem.price * eachItem.quantity
          })

          return (
            <div className="cartSummary-container">
              <div className="total-container">
                <h1 className="order-total">Order Total:</h1>
                <h1 className="total">Rs {total}/-</h1>
              </div>
              <p className="items-count">{cartList.length} items in cart</p>

              {orderPlaced && (
                <p className="success-message">
                  ✅ Your order has been placed successfully
                </p>
              )}

              <Popup
                modal
                closeOnDocumentClick
                trigger={
                  <button type="button" className="checkout-button">
                    Checkout
                  </button>
                }
              >
                {close => (
                  <div className="popup-container">
                    <h2 className="popup-title">Select Payment Method</h2>
                    <div className="payment-options">
                      <label>
                        <input
                          type="radio"
                          value="Card"
                          checked={selectedPayment === 'Card'}
                          onChange={this.handlePaymentChange}
                          disabled
                        />
                        Card
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="NetBanking"
                          checked={selectedPayment === 'NetBanking'}
                          onChange={this.handlePaymentChange}
                          disabled
                        />
                        Net Banking
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="UPI"
                          checked={selectedPayment === 'UPI'}
                          onChange={this.handlePaymentChange}
                          disabled
                        />
                        UPI
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="Wallet"
                          checked={selectedPayment === 'Wallet'}
                          onChange={this.handlePaymentChange}
                          disabled
                        />
                        Wallet
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="COD"
                          checked={selectedPayment === 'COD'}
                          onChange={this.handlePaymentChange}
                        />
                        Cash on Delivery
                      </label>
                    </div>

                    <div className="popup-summary">
                      <p>Total Items: {cartList.length}</p>
                      <p>Total Price: Rs {total}/-</p>
                    </div>

                    <button
                      type="button"
                      className={`confirmOrder-button ${
                        selectedPayment !== 'COD' ? 'disabled-btn' : ''
                      }`}
                      disabled={selectedPayment !== 'COD'}
                      onClick={() => this.handleConfirmOrder(close)}
                    >
                      Confirm Order
                    </button>
                  </div>
                )}
              </Popup>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
