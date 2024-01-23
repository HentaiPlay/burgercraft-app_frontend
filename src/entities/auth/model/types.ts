export interface ILoginDTO {
  name: string
  password: string
}

export interface IRegisterDTO extends ILoginDTO {
  roleId: number
}

export interface ITokens {
  accessToken: string | null
  refreshToken: string | null
}

export interface ITokenRefresh {
  token: string | null
}
