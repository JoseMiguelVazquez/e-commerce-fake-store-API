import React, { useEffect, useState } from 'react'
import { useSearchContext } from '@/context/SearchContext'
import ItemCard from '@/components/ItemCard'
import { getAllItems } from '@/services/itemServices'
import bannerImage from '@/assets/banner_img.jpg'
import bannerImage2 from '@/assets/banner_img_2.jpg'
import bannerImage3 from '@/assets/banner_img_3.jpg'
import bannerImage4 from '@/assets/banner_img_4.jpg'
import './home.css'

const Home = () => {
  const { setSearchTerm } = useSearchContext()
  const [items, setItems] = useState([])

  useEffect(() => {
    setSearchTerm('')
    const fetchItemsData = async () => {
      try {
        const response = await getAllItems()
        if (response.status === 200) {
          setItems(response.data)
        }
      } catch (error) {
        console.log('Ocurrió un error: ' + error.message)
      }
    }
    fetchItemsData()
  }, [])

  return (
    <>
      <div id='carouselAutoplaying' className='carousel slide' data-bs-ride='carousel'>
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <img src={bannerImage} className='d-block w-100 banner-img' alt='Banner 1' />
          </div>
          <div className='carousel-item'>
            <img src={bannerImage2} className='d-block w-100 banner-img' alt='Banner 2' />
          </div>
          <div className='carousel-item'>
            <img src={bannerImage3} className='d-block w-100 banner-img' alt='Banner 3' />
          </div>
          <div className='carousel-item'>
            <img src={bannerImage4} className='d-block w-100 banner-img' alt='Banner 4' />
          </div>
        </div>
        <button className='carousel-control-prev' type='button' data-bs-target='#carouselAutoplaying' data-bs-slide='prev'>
          <span className='carousel-control-prev-icon' aria-hidden='true' />
          <span className='visually-hidden'>Previous</span>
        </button>
        <button className='carousel-control-next' type='button' data-bs-target='#carouselAutoplaying' data-bs-slide='next'>
          <span className='carousel-control-next-icon' aria-hidden='true' />
          <span className='visually-hidden'>Next</span>
        </button>
      </div>
      <div className='container-fluid pt-4'>
        <h3>Only the best products</h3>
        <div className='row d-flex justify-content-center'>
          {items.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              imageUrl={item.image}
              name={item.product_name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
