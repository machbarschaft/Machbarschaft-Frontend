import axios from 'axios';
import apiUrl from './apiUrl';
import firebase from '../../components/firebase';

export default function apiCall(params) {
  const defaultParams = {
    baseURL: `${apiUrl()}/`,
    method: 'get',
    data: {},
    url: '',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const configParams = {
    ...defaultParams,
    ...params
  };
  const instance = axios.create(configParams);

  instance.interceptors.request.use(async (config) => {
    const idToken = await firebase.auth().currentUser?.getIdToken(true) || localStorage.getItem('token');
    localStorage.setItem('token', idToken);
    if (idToken) {
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    res => {
      return res;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return instance(configParams);
}
