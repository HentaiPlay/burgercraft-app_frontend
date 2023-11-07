import Cookies from 'cookies-ts'

const cookies = new Cookies()

type Tokens = {
  accessToken: string | null
  refreshToken: string | null
}

cookies.config({
  expires: '1d',
  path: '/'
})

export function issetTokens(): boolean {
  return Boolean(cookies.get('accessToken')) && Boolean(cookies.get('refreshToken'))
}

export function getTokens(): Tokens {
  return {
    accessToken: cookies.get('accessToken'),
    refreshToken: cookies.get('refreshToken')
  }
}

export function setTokens(tokens: Tokens): void {
  cookies.set('accessToken', tokens.accessToken)
  cookies.set('refreshToken', tokens.refreshToken)
}
