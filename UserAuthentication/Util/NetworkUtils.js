import EncryptedStorage from "react-native-encrypted-storage";
import { Alert } from "react-native";
import I18n from "../I18N/i18n";

const API_BASE_URL = 'http://localhost:8080';

const request = async (options, userSignout) => {
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

  const response = await fetch(options.url, options);
  const json = await response.json();
  if (!response.ok) {
    return Promise.reject(json);
  }
  if (json.status_code == 401) {
    userSignout();
    Alert.alert(I18n.t('alert.session')
    [{ text: I18n.t('alert.ok') }]);
  }
  return json;
};

const imageRequest = async (options) => {
  const ACCESS_TOKEN = await EncryptedStorage.getItem('user-token');
  const headers = new Headers({
    Accept: '*',
    'Content-Type': 'images/JPEG',
  })

  if (ACCESS_TOKEN) {
    headers.append('Authorization', ACCESS_TOKEN);
  }

  const defaulls = { headers: headers };
  options = Object.assign({}, defaulls, options);

  const response = await fetch(options.url, options);
  const json = await response.blob();

  if (!response.ok) {
    return Promise.reject(json);
  }
  return json;
};

const addImageRequest = async (options) => {
  const ACCESS_TOKEN = await EncryptedStorage.getItem('user-token');
  const headers = new Headers({
    'Content-Type': 'multipart/form-data;boundary=------WebKitFormBoundary2lZSUsxEA3X5jpYD'
  })

  if (ACCESS_TOKEN) {
    headers.append('Authorization', ACCESS_TOKEN);
  }

  const defaulls = { headers: headers };
  options = Object.assign({}, defaulls, options);

  const response = await fetch(options.url, options);
  const json = await response.json();
  if (json.message == "You have not enough credit balance.") {
    Alert.alert(
      I18n.t('alert.Alert'),
      I18n.t('alert.credit'),
      [{ text: I18n.t('alert.ok') }]
    );
  }
  if (!response.ok) {
    return Promise.reject(json);
  }
  return json;
};

export function login(loginRequest) {
  const urlWithParams = `${API_BASE_URL}/auth/login`;
  return request({
    url: urlWithParams,
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

  }, userSignout);
};

export function signup(signupRequest) {
  const urlWithParams = `${API_BASE_URL}/auth/signup`;
  return request({
    url: urlWithParams,
    method: 'POST',
    body: JSON.stringify(signupRequest)
  });
};

export function getJobs(queryParams) {
  const urlWithParams = `${API_BASE_URL}/job/get_all_jobs?${getQueryString(queryParams)}`;
  return request({
    url: urlWithParams,
    method: 'GET'
  });
};

export function getMyJobs(queryParams) {
  const urlWithParams = `${API_BASE_URL}/job/get_user_jobs_details?${getQueryString(queryParams)}`;
  return request({
    url: urlWithParams,
    method: 'GET'
  });
};

export function getMyAssignerJobs(queryParams) {
  const urlWithParams = `${API_BASE_URL}/job/get_assigner_jobs_details?${getQueryString(queryParams)}`;
  return request({
    url: urlWithParams,
    method: 'GET'
  });
};

export function addAssignerJobs(queryParams) {
  const urlWithParams = `${API_BASE_URL}/job/update_job_assigner?${getQueryString(queryParams)}`;
  return request({
    url: urlWithParams,
    method: 'POST'
  });
};
export function getjobDetails(queryParams) {
  const urlWithParams = `${API_BASE_URL}/job/get_job_id_details?${getQueryString(queryParams)}`;
  return request({
    url: urlWithParams,
    method: 'GET'
  });
};

export function getUserImage(queryParams) {
  const urlWithParams = `${API_BASE_URL}/images/get_image?${getQueryString(queryParams)}`;
  return imageRequest({
    url: urlWithParams,
    method: 'GET',
  });
};

export function modifiedTime(queryParams) {
  const urlWithParams = `${API_BASE_URL}/job/last_modified_time?${getQueryString(queryParams)}`;
  return request({
    url: urlWithParams,
    method: 'GET'
  });
};

export function modifiedTimeByUserId(queryParams) {
  const urlWithParams = `${API_BASE_URL}/job/last_modified_time_by_userid?${getQueryString(queryParams)}`;
  return request({
    url: urlWithParams,
    method: 'GET'
  });
};

export function modifiedTimeByAssignedId(queryParams) {
  const urlWithParams = `${API_BASE_URL}/job/last_modified_time_by_assigner_id?${getQueryString(queryParams)}`;
  return request({
    url: urlWithParams,
    method: 'GET'
  });
};


export function addJobs(queryParams, datas) {
  const urlWithParams = `${API_BASE_URL}/job/add_job?${getQueryString(queryParams)}`;
  if (datas) {
    return addImageRequest({
      url: urlWithParams,
      method: 'POST',
      body: datas,
    });
  } else {
    return request({
      url: urlWithParams,
      method: 'POST',
    });
  }
}


export function addImageUser(datas) {
  const urlWithParams = `${API_BASE_URL}/user/add_image_user`;
  console.log(urlWithParams);
  return addImageRequest({
    url: urlWithParams,
    method: 'POST',
    body: datas,
  });
};

export function getImageData(imageId) {
  const urlWithParams = `${API_BASE_URL}/images/get_image?imageId=${imageId}`;
  return imageRequest({
    url: urlWithParams,
    method: 'GET'
  });
};

export function getCredit() {
  const urlWithParams = `${API_BASE_URL}/credit/get_credit`;
  return request({
    url: urlWithParams,
    method: 'GET'
  });
};

export function getCategory() {
  const urlWithParams = `${API_BASE_URL}/category/get_all_category_list`;
  return request({
    url: urlWithParams,
    method: 'GET'
  });
};

export function getAddress() {
  const urlWithParams = `${API_BASE_URL}/address/get_address`;
  return request({
    url: urlWithParams,
    method: 'GET'
  });
};

export function addAddress(addressRequest) {
  return request({
    url: API_BASE_URL + "/address/add_address",
    method: 'POST',
    body: JSON.stringify(addressRequest)
  });
};

export function jobDelete(queryParams) {
  const urlWithParams = `${API_BASE_URL}/job/delete_job?${getQueryString(queryParams)}`;
  return request({
    url: urlWithParams,
    method: 'GET',
  });
};

function getQueryString(params) {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};
