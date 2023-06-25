import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getSingleItem } from '@/services/itemServices'
import { useSearchContext } from '@/context/SearchContext'
import { useAuthContext } from '@/context/AuthContext'
import { useCartContext } from '@/context/CartContext'
import './itemDetails.css'

const ItemDetails = () => {
  const [item, setItem] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuth } = useAuthContext()
  const { setShoppingCart, shoppingCart } = useCartContext()
  const { setSearchTerm } = useSearchContext()

  useEffect(() => {
    setSearchTerm('')
    const fetchItemData = async () => {
      try {
        const response = await getSingleItem(id)
        if (response.status === 200) {
          setItem(response.data)
        }
      } catch (error) {
        console.log('Ocurrió un error: ' + error.message)
      }
    }
    fetchItemData()
  }, [])

  const handleAddCart = () => {
    let isUpdated = false
    shoppingCart.forEach((product, index) => {
      if (product.item.id === item.id) {
        const newShoppingCart = [...shoppingCart]
        newShoppingCart[index].quantity++
        setShoppingCart(newShoppingCart)
        isUpdated = true
      }
    })
    if (!isUpdated) {
      setShoppingCart((prevShoppingCart) => [...prevShoppingCart, { item, quantity: 1 }])
    }
  }

  return (
    <>
      <div className='container-md mt-3'>
        <div>
          <button className='btn' onClick={() => navigate(-1)}> &lt; Back</button>
        </div>
        <div className='d-flex flex-column flex-sm-row mt-3'>
          <div className='px-3 mb-3 d-flex align-items-center'>
            <img className='item-image-md' src={item.image} alt='' />
          </div>
          <div className='mb-3'>
            <h1>{item.product_name}</h1>
            <p>{item.brand}</p>
            <h5>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}</h5>
            <p>{item.description}</p>
            <button
              className='btn btn-custom me-3'
              disabled={!isAuth}
              onClick={handleAddCart}
            >Add to Cart
            </button>
            {!isAuth && <Link to='/login' className='text-dark'>Log in to Buy</Link>}
          </div>
        </div>
        <div>
          <hr />
          <h5>Description</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa iste rerum aliquid libero corporis explicabo sit quod? Beatae odit vero minus eos. Quidem aspernatur distinctio, minus recusandae neque architecto, dicta aliquid atque labore quasi optio! Aliquam, impedit dolore, iste inventore officiis ex ab at cum veritatis blanditiis aspernatur, id minus? Inventore tempora error nihil reiciendis mollitia possimus labore alias accusantium nobis recusandae sequi nisi placeat consequatur commodi dignissimos sint consequuntur reprehenderit blanditiis, ullam nemo illo dolorem aspernatur esse laudantium! Repellat rerum a dicta accusamus tempora doloremque possimus, iure hic, laudantium assumenda odit unde dolorem voluptatum asperiores reprehenderit quae ea doloribus.</p>
        </div>
      </div>
      <div className='white-space-item-details' />
    </>
  )
}

export default ItemDetails
