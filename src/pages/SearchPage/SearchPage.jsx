/* eslint-disable react/jsx-indent */
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSearchContext } from '@/context/SearchContext'
import { getAllItems } from '@/services/itemServices'
import ItemCard from '@/components/ItemCard'
import './searchPage.css'

const SearchPage = () => {
  const { searchItems, setSearchItems, setSearchTerm } = useSearchContext()
  const navigate = useNavigate()
  const { query } = useParams()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setSearchTerm(query)
    const fetchItemsData = async () => {
      try {
        const response = await getAllItems()
        if (response.status === 200) {
          setSearchItems(response.data.filter(item => {
            if (query === '') {
              return item
            } else if (item.title.toLowerCase().includes(query.toLowerCase())) {
              return item
            }
            return false
          }))
          setLoading(false)
        }
      } catch (error) {
        console.log('Ocurrió un error: ' + error.message)
      }
    }
    fetchItemsData()
  }, [query])

  return (
    <>
      {
      loading
        ? <div className='search-loading-div d-flex align-items-center justify-content-center'>
            <div className='spinner-border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        : <div className='container-fluid pt-4'>
            <div>
              <button className='btn' onClick={() => navigate(-1)}> &lt; Back</button>
            </div>
            <div className='row d-flex justify-content-center'>
              <h3>Results for: "{query}"</h3>
              {searchItems.length === 0 &&
                <p className='mt-3'>No Items Matching your search</p>}
              {searchItems.map((item) => (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  imageUrl={item.image}
                  name={item.title}
                  price={item.price}
                />
              ))}
            </div>
          </div>
    }
    </>
  )
}

export default SearchPage
