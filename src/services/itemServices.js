import axios from 'axios'

const BASE_URL = 'https://fakestoreapi.com'

// axios.interceptors.request.use((config) => {
//   const token = window.localStorage.getItem('token')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// }, (error) => {
//   return Promise.reject(error)
// })

const getSingleItem = (id) => axios.get(`${BASE_URL}/products/${id}`)
const getAllItems = () => axios.get(`${BASE_URL}/products?limit=20`)
const createItem = (data) => axios.post(`${BASE_URL}/products`, data)

export {
  getSingleItem,
  getAllItems,
  createItem
}
