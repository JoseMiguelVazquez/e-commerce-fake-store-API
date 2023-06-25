import { useContext, createContext, useEffect, useState } from 'react'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

const AuthContext = createContext()

const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false)
  const [userPayload, setUserPayload] = useState(null)

  const login = (token) => {
    window.localStorage.setItem('token', token)
    const decoded = jwt_decode(token)
    setUserPayload(decoded)
    setIsAuth(true)
  }

  const logout = () => {
    window.localStorage.removeItem('token')
    setUserPayload(null)
    setIsAuth(false)
  }

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      const decoded = jwt_decode(token)
      setUserPayload(decoded)
      setIsAuth(true)
    }
  }, [])

  const values = {
    isAuth,
    userPayload,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={values}>
      {props.children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => {
  const context = useContext(AuthContext)
  return context
}

export {
  AuthContext,
  AuthProvider,
  useAuthContext
}
