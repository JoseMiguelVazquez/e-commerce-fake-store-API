import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { useSearchContext } from '@/context/SearchContext'
import { useAuthContext } from '@/context/AuthContext'
import { getSingleUser } from '@/services/userService'
import { getAllItems } from '@/services/itemServices'
import { useCartContext } from '@/context/CartContext'
import ShoppingCart from '@/components/ShoppingCart'
import Logo from '@/assets/Logo.png'
import './navbar.css'

const Navbar = () => {
  const { setSearchItems, searchTerm, setSearchTerm } = useSearchContext()
  const { isAuth, userPayload, logout } = useAuthContext()
  const { openCart, setOpenCart, shoppingCart, cartItemsNumber, calculateItemNumber } = useCartContext()
  const [userData, setuserData] = useState('')
  const searchNavigate = useNavigate()

  const fetchUserData = async () => {
    if (userPayload) {
      try {
        const response = await getSingleUser(userPayload.id)
        if (response.status === 200) {
          setuserData(response.data)
        }
      } catch (error) {
        console.log('Ocurrió un error: ' + error.message)
      }
    }
  }
  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      fetchUserData()
    }
  }, [isAuth])

  useEffect(() => {
    calculateItemNumber()
  }, [shoppingCart])

  const fetchItemsData = async () => {
    try {
      const response = await getAllItems()
      if (response.status === 200) {
        setSearchItems(response.data.filter(item => {
          if (searchTerm === '') {
            return item
          } else if (item.product_name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return item
          }
          return false
        }))
      }
    } catch (error) {
      console.log('Ocurrió un error: ' + error.message)
    }
  }

  const onSearch = (event) => {
    if (searchTerm !== '') {
      fetchItemsData()
      searchNavigate(`/search/${searchTerm}`)
    }
    event.preventDefault()
  }

  return (
    <nav className='navbar navbar-expand-md bg-body-tertiary navbar-dark'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand d-flex justify-content-center align-items-center' to='#'>
          <img className='logo ms-2' src={Logo} alt='' />
        </NavLink>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-0 mb-lg-0'>
            <li className='nav-item'>
              <NavLink className='nav-link' aria-current='page' to='/'>Home</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/about'>About</NavLink>
            </li>
            {
              userPayload?.role === 'ADMIN' &&
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/add-item'>New Item</NavLink>
                </li>
            }
          </ul>
          <form className='d-flex' role='search' onSubmit={onSearch}>
            <span className='input-group'>
              <input
                className='form-control'
                type='search'
                placeholder='Search'
                aria-label='Search'
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <button
                className='btn-search'
                type='submit'
              >
                <i className='bi bi-search' />
              </button>
            </span>
          </form>
          <ul className='navbar-nav mb-0 mb-lg-0 mx-1'>
            <li className='nav-item dropdown'>
              <NavLink className='nav-link dropdown-toggle' to='#' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                Hello, {isAuth ? userData?.first_name : ('log in or sign up')}
              </NavLink>
              <ul className='dropdown-menu'>
                {isAuth
                  ? (
                    <>
                      <li><Link className='dropdown-item' to='/' onClick={logout}>Log Out</Link></li>
                    </>
                    )
                  : (
                    <>
                      <li><Link className='dropdown-item' to='/login'>Log In</Link></li>
                      <li><hr className='dropdown-divider' /></li>
                      <li><Link className='dropdown-item' to='/signup'>Sign Up</Link></li>
                    </>
                    )}
              </ul>
            </li>
          </ul>
          {isAuth && (
            <div className='d-flex align-items-center'>
              <i className='bi bi-cart3 fs-4 text-light cart-icon me-1' onClick={() => setOpenCart(!openCart)} />
              {cartItemsNumber > 0 &&
                <span className='cartItemsNumber text-light d-flex align-items-center justify-content-center'>{cartItemsNumber}</span>}
            </div>
          )}
        </div>
      </div>
      {isAuth && (
        <ShoppingCart show={openCart} />
      )}
    </nav>
  )
}

export default Navbar
