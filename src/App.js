import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state

    const repeatedProduct = cartList.find(
      eachProduct => eachProduct.id === product.id,
    )

    if (repeatedProduct) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachProduct => {
          if (repeatedProduct.id === eachProduct.id) {
            const updatedQuantity = eachProduct.quantity + product.quantity

            return {...eachProduct, quantity: updatedQuantity}
          }

          return eachProduct
        }),
      }))
    } else {
      this.setState({cartList: [...cartList, product]})
    }

    // const newList = cartList.filter(
    //   (value, index) => cartList.indexOf(value.id) === index,
    // )

    // console.log(newList)

    // this.setState(prevState => ({
    //   cartList: [
    //     ...prevState.cartList.filter(
    //       (value, index) => cartList.indexOf(value.id) === index,
    //     ),
    //     product,
    //   ],
    // }))
  }

  removeCartItem = id => {
    const {cartList} = this.state

    const updatedList = cartList.filter(eachProduct => eachProduct.id !== id)

    this.setState({cartList: updatedList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    const productObject = cartList.find(eachItem => id === eachItem.id)

    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (id === eachItem.id) {
            return {...eachItem, quantity: eachItem.quantity - 1}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (id === eachItem.id) {
          const updatedQuantity = eachItem.quantity + 1

          return {...eachItem, quantity: updatedQuantity}
        }

        return eachItem
      }),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            removeAllCartItems: this.removeAllCartItems,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
