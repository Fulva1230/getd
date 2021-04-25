import {UserManagerSettings} from "oidc-client";

export const settings: UserManagerSettings = {
  authority: 'https://accounts.google.com',
  client_id: '',
  redirect_uri: 'http://localhost:4200/assets/popredirect.html',
  response_type: 'id_token token',
  scope: 'openid https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets',
};
