import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      console.log(cartList)

      const initialValue = 0

      const totalAmount = cartList.reduce(
        (prevPrice, eachItem) => prevPrice + eachItem.price * eachItem.quantity,
        initialValue,
      )

      console.log(totalAmount)

      return (
        <div className="summary-container">
          <h1 className="total">
            Order Total: <span className="amount">Rs {totalAmount}/- </span>
          </h1>
          <p className="cart-length">
            {cartList.length.toString()} items in cart
          </p>
          <button className="check-out-btn" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
