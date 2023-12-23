import Cookies from 'cookies-ts'
import { ITokens } from '@/entities/auth/auth.types'

const cookies = new Cookies()

cookies.config({
  expires: '1d',
  path: '/'
})

export function issetTokens(): boolean {
  return Boolean(cookies.get('accessToken')) && Boolean(cookies.get('refreshToken'))
}

export function getTokens(): ITokens {
  return {
    accessToken: cookies.get('accessToken'),
    refreshToken: cookies.get('refreshToken')
  }
}

export function setTokens(tokens: ITokens): void {
  cookies.set('accessToken', tokens.accessToken)
  cookies.set('refreshToken', tokens.refreshToken)
}
