import React from 'react'
import Logo from '@/assets/Logo.png'
import './footer.css'

const Footer = () => {
  return (
    <footer className='mt-5 pt-4 text-light d-flex flex-column align-items-center'>
      <img className='logo mb-4' src={Logo} alt='' />
      <div className='text-center'>
        <p className='mb-2'>Terms of Use | Privacy Notice</p>
        <p className='mb-2'>2015-2023, Online Shop</p>
        <p className='text-light'>
          Developed by
          <a
            className='developed-link'
            target='_blank'
            href='https://github.com/JoseMiguelVazquez'
            rel='noreferrer'
          >José Miguel Vázquez E.
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
