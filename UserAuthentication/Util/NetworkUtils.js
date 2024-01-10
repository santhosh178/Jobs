import EncryptedStorage from "react-native-encrypted-storage";
import { Alert } from "react-native";
import I18n from "../I18N/i18n";

const API_BASE_URL = 'http://localhost:8080';

const request = async (options,userSignout) => {
  const ACCESS_TOKEN = await EncryptedStorage.getItem('user-token');
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  })

  if (ACCESS_TOKEN) {
    headers.append('Authorization', ACCESS_TOKEN);
  }

  const defaulls = { headers: headers };
  options = Object.assign({}, defaulls, options);

  const response = await fetch(options.url,options);
  const json = await response.json();
  if (!response.ok) {
    return Promise.reject(json);
  }
  if (json.status_code == 401) {
    Alert.alert('', I18n.t('alert.session'), [
      { text: I18n.t('alert.ok'), onPress: () => userSignout() },
    ]);
  }
  return json;
};

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + '/auth/login',
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
};

export async function getCurrentUser(userSignout) {
  if (!await EncryptedStorage.getItem('user-token')) {
    return Promise.reject("No access token set.");
  }
  const urlWithParams = `${API_BASE_URL}/user/me`;

  return request({
    url: urlWithParams,
    method: 'GET'
    
  },userSignout);
};

export function signup(signupRequest) {
  return request({
      url: API_BASE_URL + "/auth/signup",
      method: 'POST',
      body: JSON.stringify(signupRequest)
  });
};

export  function getJobs(queryParams) {
  const urlWithParams = `${API_BASE_URL}/job/get_all_jobs?${getQueryString(queryParams)}`;
  return request({
    url: urlWithParams,
    method: 'GET'
  });
};

export  function getMyJobs(queryParams) {
  const urlWithParams = `${API_BASE_URL}/job/get_user_jobs_details?${getQueryString(queryParams)}`;
  return request({
    url: urlWithParams,
    method: 'GET'
  });
};

function getQueryString(params) {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}