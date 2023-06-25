import React from 'react'
import { Link } from 'react-router-dom'
import imageNotAvailable from '@/assets/Image-Not-Available.png'
import './itemCard.css'

const ItemCard = ({ id, imageUrl, name, price }) => {
  return (
    <div className='col my-1 py-1 px-1 d-flex justify-content-center'>
      <Link
        to={`/items/${id}`}
        className='text-decoration-none text-dark d-flex justify-content-center link-card-container'
      >
        <div className='card card-container'>
          <div className='card-img-container d-flex justify-content-center p-2 mt-2'>
            <img
              className='item-image-sm'
              src={imageUrl || imageNotAvailable}
              alt='item'
            />
          </div>
          <div className='card-text-container d-flex flex-column justify-content-center px-3'>
            <h6>{name}</h6>
            <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ItemCard
