import React, { useEffect } from 'react'
import { useSearchContext } from '@/context/SearchContext'
import './about.css'

const About = () => {
  const { setSearchTerm } = useSearchContext()

  useEffect(() => {
    setSearchTerm('')
  }, [])

  return (
    <>
      <div className='container mt-5 about-section'>
        <h1>About this Project</h1>
        <p>This app was made with React and Bootstrap using a <a target='_blank' href='https://github.com/warderer/json-server-jwt/blob/main/db.json' rel='noreferrer'>local API made by Cesar Guerra</a></p>
        <p>Tab Icon made from <a target='_blank' href='http://www.onlinewebfonts.com/icon' rel='noreferrer'>Icon Fonts</a> is licensed by CC BY 3.0</p>
        <a target='_blank' href='https://www.vecteezy.com/free-vector/ecommerce-banner' rel='noreferrer'>Ecommerce Banners Vectors and Logo by Vecteezy</a>
        <p className='mt-5'>Developed by <a target='_blank' href='https://github.com/JoseMiguelVazquez' rel='noreferrer'>José Miguel Vázquez E.</a></p>
      </div>
      <div className='white-space' />
    </>
  )
}

export default About
