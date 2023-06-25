import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from '@/components/Navbar'
import RoutesIndex from '@/routes/RoutesIndex'
import { SearchProvider } from '@/context/SearchContext'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import Footer from '@/components/Footer'

function App () {
  return (
    <div className='App'>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <SearchProvider>
              <Navbar />
              <RoutesIndex />
              <Footer />
            </SearchProvider>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </div>
  )
}

export default App
