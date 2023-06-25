import axios from 'axios'

const BASE_URL = 'https://fakestoreapi.com'

const registerUserService = (data) => axios.post(`${BASE_URL}/users`, data)

const loginUserService = (data) => axios.post(`${BASE_URL}/auth/login`, data)

const getSingleUser = (id) => axios.get(`${BASE_URL}/users/${id}`)

export {
  registerUserService,
  loginUserService,
  getSingleUser
}
