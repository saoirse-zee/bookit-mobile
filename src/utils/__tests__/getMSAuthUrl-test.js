import { getMSAuthUrl } from '../index'


describe('Auth url creator', () => {
  test('throw an error when auth options is missing', () => {
    const authOptions = undefined
    const redirectUrl = 'https://auth.com'
    function tryToGetUrl() {
      getMSAuthUrl(authOptions, redirectUrl)
    }
    expect(tryToGetUrl).toThrow()
  })

  test('throw an error when auth options is missing properties', () => {
    const authOptions = {
      clientId: '123',
      nonce: 'noncesense',
      responseMode: 'fragment',
      state: 'uniqueish-string-to-prevent-crsf-attack',
      loginHint: 'email@email',
    }
    const redirectUrl = 'https://auth.com'
    function tryToGetUrl() {
      getMSAuthUrl(authOptions, redirectUrl)
    }
    const error = new Error('The MS auth configuration is invalid.')
    expect(tryToGetUrl).toThrow(error)
  })

  test('returns a good-looking url when it has what it needs', () => {
    const authOptions = {
      clientId: '123',
      responseType: 'id_token token',
      nonce: 'noncesense',
      responseMode: 'fragment',
      state: 'uniqueish-string',
      prompt: 'login',
      loginHint: 'email@email',
    }
    const redirectUrl = 'exp://auth.expo.io/@funcorp/bookit-mobile'
    const url = getMSAuthUrl(authOptions, redirectUrl)

    const expectedUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize' +
      '?client_id=123' +
      '&scope=openid%20profile%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fcalendars.read%20https%3A%2F%2Fgraph.microsoft.com%2Fcalendars.readwrite%20https%3A%2F%2Fgraph.microsoft.com%2Fuser.read' +
      '&response_type=id_token%20token' +
      '&nonce=noncesense' +
      '&redirect_uri=exp%3A%2F%2Fauth.expo.io%2F%40funcorp%2Fbookit-mobile' +
      '&response_mode=fragment' +
      '&state=uniqueish-string' +
      '&prompt=login'

    expect(url).toBe(expectedUrl)
  })
})
