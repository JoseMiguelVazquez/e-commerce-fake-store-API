import React, { useEffect } from 'react'
import { useCartContext } from '@/context/CartContext'
import './shoppingCart.css'

const ShoppingCart = ({ show }) => {
  const { setOpenCart } = useCartContext()
  const { shoppingCart, setShoppingCart, calculateTotal, cartTotal } = useCartContext()

  useEffect(() => {
    calculateTotal()
  }, [shoppingCart])

  function handleIncreaseQuantity (index) {
    const newShoppingCart = [...shoppingCart]
    newShoppingCart[index].quantity++
    setShoppingCart(newShoppingCart)
  }

  function handleDecreaseQuantity (index) {
    let newShoppingCart = []
    if (shoppingCart[index].quantity > 1) {
      newShoppingCart = [...shoppingCart]
      newShoppingCart[index].quantity--
    } else {
      newShoppingCart = shoppingCart.filter((product, i) => {
        return i !== index
      })
    }
    setShoppingCart(newShoppingCart)
  }

  function handleDeleteProduct (index) {
    const newShoppingCart = shoppingCart.filter((product, i) => {
      return i !== index
    })
    setShoppingCart(newShoppingCart)
  }

  return (
    <div className={`shopping-cart ${show ? 'show-cart' : ''}`}>
      <h3 className='mt-3 text-center'>Shopping Cart</h3>
      <hr />
      <div className='shopping-products'>
        <ul className='list-group product-list'>
          {shoppingCart.map((item, index) => (
            <li className='list-group-item d-flex align-items-center' key={item.item.id}>
              <div className='me-2 cart-product-img-container'>
                <img className='cart-product-img' src={item.item.image} alt='' />
              </div>
              <div className='cart-product-info'>
                <h6 className='m-0 fw-bold'>{item.item.product_name}</h6>
                <p className='m-0'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseInt(item.item.price))}</p>
                <div className='m-0 d-flex align-items-center'>
                  <i className='bi bi-dash mx-1' onClick={() => handleDecreaseQuantity(index)} />
                  <p className='m-0'>{item.quantity}</p>
                  <i className='bi bi-plus mx-1' onClick={() => handleIncreaseQuantity(index)} />
                </div>
                <p className='m-0'>Total: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseInt(item.item.price) * item.quantity)}</p>
                <i className='bi bi-trash3 ms-3' onClick={() => handleDeleteProduct(index)} />
              </div>
            </li>
          ))}
        </ul>
        <hr />
        <h5>
          Total Cost:
          <span className='ms-2'>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cartTotal)}
          </span>
        </h5>
      </div>
      <div className='checkout'>
        <button className='btn btn-custom'>CHECKOUT</button>
        <button className='btn btn-dark' onClick={() => setOpenCart(false)}>CLOSE</button>
      </div>
    </div>
  )
}

export default ShoppingCart
