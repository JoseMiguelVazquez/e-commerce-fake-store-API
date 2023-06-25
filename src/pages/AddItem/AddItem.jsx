import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchContext } from '@/context/SearchContext'
import swal from 'sweetalert'
import useForm from '@/hooks/useForm'
import { createItem } from '@/services/itemServices'

const AddItem = () => {
  const navigate = useNavigate()
  const { setSearchTerm } = useSearchContext()

  useEffect(() => {
    setSearchTerm('')
  }, [])

  const sendData = async (data) => {
    try {
      const response = await createItem(data)
      if (response.status === 200) {
        console.log('Product Added: ', response)
        swal('New Item Successfully Created')
        navigate('/')
      }
    } catch (error) {
      swal('An Error Occurred, Please Try Again Later')
      console.log('An Error Has Ocurred: ' + error.message)
      resetForm()
    }
  }

  const { input, handleInputChange, handleSubmit, resetForm } = useForm(sendData, {
    product_name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    sku: '',
    image: ''
  })

  const productCategories = [
    'Books', 'Movies', 'Music', 'Games', 'Electronics', 'Computers', 'Home', 'Garden', 'Tools',
    'Grocery', 'Health', 'Beauty', 'Toys', 'Kids', 'Baby', 'Clothing', 'Shoes', 'Jewelery',
    'Sports', 'Outdoors', 'Automotive', 'Industrial'
  ]

  return (
    <div>
      <div className='container mt-4'>
        <div>
          <h2>Add New Item</h2>
          <h5>Create a new product</h5>
          <hr />
        </div>
        <form
          className='col-12 col-md-8 col-lg-6 col-xl-4'
          onSubmit={handleSubmit}
        >
          <div className='mb-3'>
            <label className='form-label' htmlFor='product_name'>Product Name</label>
            <input
              className='form-control'
              type='text'
              name='product_name'
              placeholder='Name of the new product'
              id='product_name'
              value={input.product_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='description'>Description</label>
            <textarea
              className='form-control'
              type='text'
              name='description'
              placeholder='Type the product description'
              id='description'
              value={input.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='price'>Product Price</label>
            <input
              className='form-control'
              type='number'
              name='price'
              id='price'
              min='0'
              max='10000'
              value={input.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='category'>Category</label>
            <select
              className='form-select'
              name='category'
              id='category'
              value={input.category}
              onChange={handleInputChange}
              required
            >
              <option value=''>Choose the product category</option>
              {productCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='brand'>Brand</label>
            <input
              className='form-control'
              type='text'
              name='brand'
              placeholder='Brand of the new product'
              id='brand'
              value={input.brand}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='sku'>SKU</label>
            <input
              className='form-control'
              type='text'
              name='sku'
              placeholder='SKU of the new product'
              id='sku'
              value={input.sku}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='image'>Image URL</label>
            <input
              className='form-control'
              type='text'
              name='image'
              placeholder='Image URL of the new product'
              id='image'
              value={input.image}
              onChange={handleInputChange}
              required
            />
          </div>
          <button className='btn btn-custom me-3' type='submit'>
            Register New Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddItem
