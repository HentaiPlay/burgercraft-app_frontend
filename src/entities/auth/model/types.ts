export interface IAuthData {
  name: string
  password: string
}

export interface ITokens {
  accessToken: string | null
  refreshToken: string | null
}

export interface ITokenRefresh {
  token: string | null
}
