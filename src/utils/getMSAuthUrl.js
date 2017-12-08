const getMSAuthUrl = (options, redirectUrl) => {
  const {
    clientId,
    responseType,
    nonce,
    responseMode,
    state,
    prompt,
    // loginHint, // Do we want this hint?
  } = options

  if (!(
    clientId &&
    responseType &&
    nonce &&
    responseMode &&
    state &&
    prompt
  )) {
    const authConfigError = new Error('The MS auth configuration is invalid.')
    throw authConfigError
  }
  const scope = encodeURIComponent([
    'openid',
    'profile',
    'offline_access',
    'https://graph.microsoft.com/calendars.read',
    'https://graph.microsoft.com/calendars.readwrite',
    'https://graph.microsoft.com/user.read',
  ].join(' '))
  const encodedRedirectUrl = encodeURIComponent(redirectUrl)
  const encodedResponseType = encodeURIComponent(responseType)

  return ('https://login.microsoftonline.com/common/oauth2/v2.0/authorize' +
      `?client_id=${clientId}` +
      `&scope=${scope}` +
      `&response_type=${encodedResponseType}` +
      `&nonce=${nonce}` +
      `&redirect_uri=${encodedRedirectUrl}` +
      `&response_mode=${responseMode}` +
      `&state=${state}` +
      `&prompt=${prompt}`
      // `&login_hint=${loginHint}` // Do we want this hint?
  )
}

export default getMSAuthUrl
