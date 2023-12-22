export interface IAuthData {
  name: string
  password: string
}

export interface ITokens {
  accessToken: string | null
  refreshToken: string | null
}

export type RefreshTokenType = Pick<ITokens, 'refreshToken'>
