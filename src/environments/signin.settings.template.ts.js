export const settings = {
  authority: 'https://accounts.google.com',
  client_id: '',
  redirect_uri: 'http://localhost:4200/login-callback',
  silent_redirect_uri: 'http://localhost:4200/silent-login-callback',
  response_type: 'id_token token',
  scope: 'openid https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets',
};
