import axios from 'axios'
const baseURL: string = import.meta.env.VITE_API_URL
import { IAuthData, RefreshTokenType } from './auth.types'

class AuthService {
  async login(authData: IAuthData) {
    return await axios.post(`${baseURL}auth/login`, authData)
  }

  async register(authData: IAuthData) {
    return await axios.post(`${baseURL}auth/register`, authData)
  }

  async refreshTokens(token: RefreshTokenType) {
    return await axios.post(`${baseURL}auth/refresh-token`, token)
  }
}

export default new AuthService()
