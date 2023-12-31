import axios from 'axios'
const baseURL: string = import.meta.env.VITE_API_URL
import { ILoginDTO, IRegisterDTO, ITokenRefresh } from '../model/types'

export default function useAuthApi() {
  return {
    login: async (authData: ILoginDTO) => {
      return await axios.post(`${baseURL}auth/login`, authData)
    },

    register: async (authData: IRegisterDTO) => {
      return await axios.post(`${baseURL}auth/register`, authData)
    },

    refreshTokens: async (token: ITokenRefresh) => {
      return await axios.post(`${baseURL}auth/refresh`, token)
    }
  }
}
